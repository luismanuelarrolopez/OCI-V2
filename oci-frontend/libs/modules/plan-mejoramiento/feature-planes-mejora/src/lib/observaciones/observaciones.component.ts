import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@unicauca/auth';
import {estadosObservacion, estadosPlan, UserService} from '@unicauca/core';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import {
  PlanService,
  plan,
  Observacion,
  ObservacionesService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'unicauca-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.scss'],
})
export class ObservacionesComponent implements OnInit {
  formularioObservacion: FormGroup;
  titulo = '';
  nombreBoton = '';
  plan: plan;
  codeUrl: string;
  idHallazgo: number;
  idUsuario: number;
  observacion: Observacion;

  modoEdicionActivo = false;
  public listadoEstado = estadosPlan;
  public listadoEstadoObservacion = estadosObservacion;


  contador = 0;
  esLiderProceso = false;

  unsubscribe$ = new Subject();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ObservacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public parametroEntrada: any,

    private formBuilder: FormBuilder,
    private hallazgoService: HallazgoService,
    private observacionesService: ObservacionesService,
    private servicioPlan: PlanService
  ) {}

  ngOnInit(): void {
    this.esLiderProceso = (this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso');
    this.idUsuario = this.authService.getUsuario().id;
    this.crearFormulario();
    this.verificarEstadoComponente();
  }

  verificarEstadoComponente() {
    this.codeUrl = this.parametroEntrada.data.codeUrl;
    this.plan = this.parametroEntrada.data.plan;
    if (this.parametroEntrada.data.crear) {
      this.modoCreacion();
      this.modoEdicionActivo = false;
    } else {
      this.observacion=this.parametroEntrada.data.observacion;
      this.modeEdicion();
      this.modoEdicionActivo = true;
    }

    this.objPlan.setValue(this.plan);
    this.userService.getUsuario(this.idUsuario).subscribe(objUsuario=> this.objPerson.setValue(objUsuario.objPerson))
  }

  private crearFormulario(): void {
    this.formularioObservacion = this.formBuilder.group({
      id_observacion: [null],
      descripcion: [null, Validators.required],
      fecha_registro: [null],
      objPlan: [null],
      objPerson: [null],
      estado: [null],
      tipo_plan_mejora: [this.servicioPlan.getTipoPlan()]
    });
  }

  private modoCreacion(): void {
    this.titulo = 'Registrar observación';
    this.nombreBoton = 'Guardar';
  }

  private modeEdicion(): void {
    this.titulo = 'Editar observación';
    this.nombreBoton = 'Editar';
    this.formularioObservacion.setValue(this.observacion);
    const cadena: string = this.observacion.descripcion;
    this.contador = cadena.length;
  }

  public onDesicionCreacionOEditar(): void {
    this.modoEdicionActivo ? this.onEditar() : this.onGuardar();
  }
  public onEditar(): void {
    if (this.formularioObservacion.invalid) {
      return;
    }
    this.observacionesService
      .editarObservacion(this.formularioObservacion.value, this.observacion.id_observacion)
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
    this.formularioObservacion.value.estado = this.listadoEstadoObservacion[0].descripcion
    console.log(this.formularioObservacion.value)
    if (this.formularioObservacion.invalid) {
      return;
    }
    this.observacionesService
      .crearObservacion(this.formularioObservacion.value)
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
    this.dialogRef.close();
  }

  get objPlan() {
    return this.formularioObservacion.get('objPlan');
  }
  get objPerson() {
    return this.formularioObservacion.get('objPerson');
  }
  get fecha_registro() {
    return this.formularioObservacion.get('fecha_registro');
  }
  onKey(event) {
    this.contador = event.target.value.length;
  }
}
