import { AuthService } from './../../../../../../auth/src/lib/data-access/auth/auth.service';
import { Actividad } from './../../../../../plan-mejoramiento/data-access/src/lib/model/actividad.model';
import { AccionesService } from './../../../../../acciones/data-access/src/lib/service/acciones.service';
import { EstadoButtons, Columna, TipoColumna } from './../../../../../../shared/components/tabla/src/lib/model/tabla.model';
import { Causa } from './../../../../../plan-mejoramiento/data-access/src/lib/model/causa.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EstadosComunService } from '@unicauca/core';
import {Accion, plan, PlanService} from '@unicauca/modules/plan-mejoramiento/data-access';
import { takeUntil, tap, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';

@Component({
  selector: 'unicauca-historial-actividades',
  templateUrl: './historial-actividades.component.html',
  styleUrls: ['./historial-actividades.component.scss']
})
export class HistorialActividadesComponent implements OnInit {

  nombrePlan = '';
  nombreHallazgo = '';
  nombreCausa = '';
  nombreAccion= '';
  descripcionAccion = '';
  titulo = '';
  activarFiltroItems = true;
  unsubscribe$ = new Subject();

  accion: Accion;
  actividades: Actividad[] = [];
  planes: plan[];
  boolAjuntarEvidencia = false;

  esAuditor = false;

  estadoButtons: EstadoButtons = {};

  columnas: Columna[] = [
    { nombreCelda: 'posicion', nombreCeldaHeader: 'Número' },
    { nombreCelda: 'indicador', nombreCeldaHeader: 'Indicador' },
    { nombreCelda: 'periodicidad', nombreCeldaHeader: 'Periodicidad' },
    { nombreCelda: 'recurso', nombreCeldaHeader: 'Recursos' },
    { nombreCelda: 'objResponsable', nombreCeldaHeader: 'Responsable' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  streamDatos$ = new BehaviorSubject<any[]>([]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private actividadesService: ActividadesService,
    private estadosComunService: EstadosComunService,
    private servicioPlan: PlanService,
  ) {}

  ngOnInit(): void {
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.llenarBotones();
    this.estadosComunService.customAccion
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((msg) => (this.accion = msg));
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.listarActividades();
  }

  llenarBotones(){
    this.estadoButtons = {
      crear: false,
      editar: true,
      eliminar: !this.esAuditor,
      upload: false,
      visualizar: true,
      seleccionar: false,
      verObservacion: !this.esAuditor,
      crearObservacion: this.esAuditor,
    };
  }

  private listarActividades(): void {
    if (this.accion !== null) {
      this.nombrePlan = this.accion.objCausa.objHallazgo.objPlan.nombre;
      this.nombreHallazgo = this.accion.objCausa.objHallazgo.hallazgo;
      this.descripcionAccion = this.accion.descripcion;
      this.nombreCausa = this.accion.objCausa.causa;
      this.nombreAccion = this.accion.accion;
      this.actividadesService.getActividadesPorIdAccion(this.accion.idAccion)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(res => this.actividades = res),
        map((listadoActividades: any[])=>
          listadoActividades.map((actividad, index)=> ({
            id: actividad.id_Actividad,
            posicion: index+1,
            indicador: actividad.indicador,
            periodicidad: actividad.periodicidad,
            recurso: actividad.recurso,
            objResponsable: actividad.objResponsable.names + ' '+ actividad.objResponsable.surnames
          })))
      )
      .subscribe(
        (datosActividades) => {
          this.streamDatos$.next(datosActividades);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
  }

  public agregar(): void {
    if (this.accion !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/actividades/gestionActividades',
        this.accion.idAccion
      ])
      this.estadosComunService.changeSelectedIndex(4);
    }
  }
  public onDeleteActividad($actividad): void {
    Swal.fire({
      title: `¿Deseas eliminar la actividad ${$actividad.posicion}?`,
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.actividadesService
          .deleteActividad($actividad.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (respuestaBack) => {
              this.listarActividades();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${respuestaBack.mensaje}`,
                showConfirmButton: true
              });
            },
            (error) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${error.error.mensaje}`,
                showConfirmButton: true
              });
            }
          );
      }
    });
  }
  public onEditarActividad($actividad): void {
    if (this.accion !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/actividades/gestionActividades',
        this.accion.idAccion, $actividad.id, this.esAuditor
      ]);
      localStorage.setItem('visualizar', 'false');
      this.estadosComunService.changeSelectedIndex(4);
    }
  }
  public onVisualizarActividad($actividad): void {
    if (this.accion !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/actividades/gestionActividades',
        this.accion.idAccion, $actividad.id, this.esAuditor
      ]);
      localStorage.setItem('visualizar', 'true');
      this.estadosComunService.changeSelectedIndex(4);
    }
  }
  public onAdjuntarEvidencia($actividad): void {
    if (this.accion !== null) {
      this.router.navigate([
        '/home/seguimiento-plan-mejora/seguimiento'
      ]);
    }
  }
  onVisualizarObservacion() {
    this.servicioPlan.setTipoPlan(5);
    console.log(this.servicioPlan.getIdPlan())
    console.log(this.router.url);
    this.planes = this.servicioPlan.getPlanAlmacenado();
    console.log(this.planes);
    const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === this.servicioPlan.getIdPlan()
    );
    this.servicioPlan.setData(false);
    this.router.navigate([
      'home/planes-mejora/historial/planes' + '/ver-plan',planAEditar[0].codeURL
    ]);
    localStorage.setItem('visualizar', 'true');
    this.estadosComunService.changeSelectedIndex(4);

    //this.verificarEstadoComponente()
  }
}
