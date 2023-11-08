import { TipoControl } from './../../../../../plan-mejoramiento/data-access/src/lib/model/tipo-control.model';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CausaService } from '@unicauca/modules/causas/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { Hallazgo, TipoControlService } from '@unicauca/modules/plan-mejoramiento/data-access';

@Component({
  selector: 'unicauca-gestion-causas',
  templateUrl: './gestion-causas.component.html',
  styleUrls: ['./gestion-causas.component.scss'],
})
export class GestionCausasComponent implements OnInit {

  formularioCausa: FormGroup;
  titulo = '';
  nombreBoton = '';
  idHallazgo: number;
  idCausa: number;
  hallazgo: Hallazgo;
  tipoControl: TipoControl[] = []
  descripcion= '';

  contador = 0

  mostrarBtnVolver = false;
  modoEdicionActivo = false;

  unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private causaService: CausaService,
    private activatedRoute: ActivatedRoute,
    private hallazgoService: HallazgoService,
    private tipoControlService: TipoControlService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.tipoControlService.getTipoControl().subscribe((tipoControl: any)=>{
      this.tipoControl = tipoControl.tipoControl
    });
    this.verificarEstadoComponente();
  }

  verificarEstadoComponente() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((respuestaURL) => {
          this.idHallazgo = parseInt(respuestaURL.get('idHallazgo'));
          this.idCausa = parseInt(respuestaURL.get('idCausa'));
          return this.hallazgoService.getHallazgoPorId(this.idHallazgo);
        })
      )
      .subscribe((objHallazgo: any) => {
        this.hallazgo = objHallazgo.hallazgo;
        this.descripcion = this.hallazgo.hallazgo
        if (this.idCausa) {
          this.modeEdicion();
          this.modoEdicionActivo = true;
        } else {
          this.modoCreacion();
          this.modoEdicionActivo = false;
        }
      });
  }

  private crearFormulario(): void {
    this.formularioCausa = this.formBuilder.group({
      id_causa: [null],
      causa: [null, Validators.required],
      objHallazgo: [null],
      listaAcciones: [null]
    });
  }

  private modoCreacion(): void {
    this.objHallazgo.setValue(this.hallazgo);
    this.titulo = 'Identificar causa';
    this.nombreBoton = 'Guardar';
  }

  private modeEdicion(): void {
    this.titulo = 'Editar causa';
    this.nombreBoton = 'Editar';
    this.causaService
      .getCausaPorId(this.idCausa)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack: any) => {
        this.formularioCausa.setValue(respuestaBack.causa)
        const cadena: string = respuestaBack.causa.causa;
       this.contador = cadena.length;
      }
      );
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioCausa.disable();
      this.mostrarBtnVolver = true;
      this.titulo = 'Ver causa';
    }
  }

  public onDesicionCreacionOEditar(): void {
    this.modoEdicionActivo ? this.onEditar() : this.onGuardar();
  }
  public onEditar(): void {
    if (this.formularioCausa.invalid) {
      return;
    }
    this.causaService
      .editarCausa(this.formularioCausa.value, this.id_causa.value)
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
    if (this.formularioCausa.invalid) {
      return;
    }
    this.causaService
    .crearCausa(this.formularioCausa.value)
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
    this.router.navigate(['/home/planes-mejora/historial/causas']);
  }

  get id_causa() {
    return this.formularioCausa.get('id_causa');
  }
  // get hallazgo() {
  //   return this.formularioCausa.get('hallazgo');
  // }
  get objHallazgo() {
    return this.formularioCausa.get('objHallazgo');
  }

  onKey(event){
    this.contador = event.target.value.length
   }
}
