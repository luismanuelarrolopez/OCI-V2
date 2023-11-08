import { Causa } from './../../../../../plan-mejoramiento/data-access/src/lib/model/causa.model';
import { HallazgoService } from './../../../../../hallazgos/data-access/src/lib/service/hallazgo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { TipoControl, TipoControlService } from '@unicauca/modules/plan-mejoramiento/data-access';
import { CausaService } from 'libs/modules/causas/data-access/src/lib/service/causa.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'unicauca-gestion-acciones',
  templateUrl: './gestion-acciones.component.html',
  styleUrls: ['./gestion-acciones.component.scss']
})
export class GestionAccionesComponent implements OnInit {

  formularioAccion: FormGroup;
  titulo = '';
  nombreBoton = '';
  idCausa: number;
  idAccionPa: number;
  causa: Causa;
  // tipoControl: TipoControl[] = []

  mostrarBtnVolver = false;
  modoEdicionActivo = false;

  contador = 0

  unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private causaService: CausaService,
    private activatedRoute: ActivatedRoute,
    private hallazgoService: HallazgoService,
    private accionesService: AccionesService,
    private tipoControlService: TipoControlService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    // this.tipoControlService.getTipoControl().subscribe((tipoControl: any)=>{
    //   this.tipoControl = tipoControl.tipoControl
    //   this.tipoControlF.setValue(this.tipoControl[0].idTipoControl);
    // });
    this.verificarEstadoComponente();
  }

  verificarEstadoComponente() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((respuestaURL) => {
          this.idCausa = parseInt(respuestaURL.get('idCausa'));
          this.idAccionPa = parseInt(respuestaURL.get('idAccion'));
          return this.causaService.getCausaPorId(this.idCausa);
        }
      ))
      .subscribe((objCausa: any) => {

        this.causa = objCausa.causa;
        if (this.idAccionPa) {
          this.modeEdicion();
          this.modoEdicionActivo = true;
        } else {
          this.modoCreacion();
          this.modoEdicionActivo = false;
        }
      });
  }

  private crearFormulario(): void {
    this.formularioAccion = this.formBuilder.group({
      idAccion: [null],
      accion: [null, Validators.required],
      descripcion: [null, Validators.required],
      objCausa: [null],
      listaActividades: [null],
      // tipoControl: [null]
    });
  }

  private modoCreacion(): void {
    this.objCausa.setValue(this.causa);
    this.titulo = 'Formular acción';
    this.nombreBoton = 'Guardar';
  }
  private modeEdicion(): void {
    this.titulo = 'Editar acción';
    this.nombreBoton = 'Editar';
    this.accionesService
      .getAccionPorId(this.idAccionPa)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack: any) => {
        this.formularioAccion.setValue(respuestaBack.accion)
        const cadena: string = respuestaBack.accion.descripcion;
       this.contador = cadena.length;
        this.tipoControlF.setValue(respuestaBack.accion.tipoControl.idTipoControl);
      }
      );
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioAccion.disable();
      this.mostrarBtnVolver = true;
      this.titulo = 'Ver acción';
    }
  }
  public onDesicionCreacionOEditar(): void {
    this.modoEdicionActivo ? this.onEditar() : this.onGuardar();
  }
  public onEditar(): void {
    if (this.formularioAccion.invalid) {
      return;
    }
    // this.tipoControlF.setValue(this.tipoControl.filter(tipo=> tipo.idTipoControl === this.tipoControlF.value)[0]);
    this.accionesService
      .editarAccion(this.formularioAccion.value, this.idAccion.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${respuestaBack.mensaje}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.volver();
      });
  }
  public onGuardar(): void {
    if (this.formularioAccion.invalid) {
      return;
    }
    // this.tipoControlF.setValue(this.tipoControl.filter(tipo=> tipo.idTipoControl === this.tipoControlF.value)[0]);

    this.accionesService
    .crearAccion(this.formularioAccion.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${respuestaBack.mensaje}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.volver();
      });
  }
  public listar(): void {
    this.volver();
  }
  public volver(): void {
    this.router.navigate(['/home/planes-mejora/historial/acciones']);
  }

  get idAccion() {
    return this.formularioAccion.get('idAccion');
  }
  get accion() {
    return this.formularioAccion.get('accion');
  }
  get descripcion() {
    return this.formularioAccion.get('descripcion');
  }
  get objCausa() {
    return this.formularioAccion.get('objCausa');
  }
  get tipoControlF() {
    return this.formularioAccion.get('tipoControl');
  }
  onKey(event){
    this.contador = event.target.value.length
   }
}
