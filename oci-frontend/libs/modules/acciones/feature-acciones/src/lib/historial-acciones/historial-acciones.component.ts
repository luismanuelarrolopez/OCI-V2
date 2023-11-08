import { AuthService } from './../../../../../../auth/src/lib/data-access/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { EstadosComunService } from '@unicauca/core';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import {Causa, Accion, plan, PlanService} from '@unicauca/modules/plan-mejoramiento/data-access';
import { Columna, EstadoButtons, TipoColumna } from '@unicauca/shared/components/tabla';

@Component({
  selector: 'unicauca-historial-acciones',
  templateUrl: './historial-acciones.component.html',
  styleUrls: ['./historial-acciones.component.scss']
})
export class HistorialAccionesComponent implements OnInit {

  nombrePlan = '';
  nombreHallazgo = '';
  nombreCausa = '';
  titulo = '';
  activarFiltroItems = true;
  unsubscribe$ = new Subject();

  causa: Causa;
  acciones: Accion[] = [];
  planes: plan[];

  esAuditor = false;
  hintAgregarOVerAuditor = '';

  estadoButtons: EstadoButtons = {};

  columnas: Columna[] = [
    { nombreCelda: 'posicion', nombreCeldaHeader: 'Número' },
    { nombreCelda: 'nombre', nombreCeldaHeader: 'Tipo de acción' },
    { nombreCelda: 'descripcion', nombreCeldaHeader: 'Descripción' },
    // { nombreCelda: 'tipoControl', nombreCeldaHeader: 'Tipo de control' },
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
    private accionesService: AccionesService,
    private estadosComunService: EstadosComunService,
    private servicioPlan: PlanService
  ) {}

  ngOnInit(): void {
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.hintAgregarOVerAuditor = (this.esAuditor ? 'Ver' : 'Agregar');
    this.llenarBotones();
    this.estadosComunService.customCausa
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((msg) => (this.causa = msg));
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.listarAcciones();
  }

  llenarBotones(){
    this.estadoButtons = {
      crear: true,
      editar: !this.esAuditor,
      eliminar: !this.esAuditor,
      upload: false,
      visualizar: true,
      seleccionar: false,
      verObservacion: !this.esAuditor,
      crearObservacion: this.esAuditor,
    };
  }

  private listarAcciones(): void {
    if (this.causa !== null) {
      this.nombrePlan = this.causa.objHallazgo.objPlan.nombre;
      this.nombreHallazgo = this.causa.objHallazgo.hallazgo;
      this.nombreCausa = this.causa.causa;
      this.accionesService
        .getAccionPorIdCausa(this.causa.id_causa)
        .pipe(
          takeUntil(this.unsubscribe$),
          tap(res=> this.acciones = res),
          map((listadoCausas: any[]) =>
            listadoCausas.map((accion, index) => ({
              id: accion.idAccion,
              posicion: index + 1,
              nombre: accion.accion,
              descripcion: accion.descripcion,
              objCausa: accion.objCausa,
              // tipoControl: accion.tipoControl.nombreTipoControl
            }))
          )
        )
        .subscribe(
          (datosAccion) => {
            this.streamDatos$.next(datosAccion);
          },
          () => {
            this.streamDatos$.next([]);
          }
        );
    }
  }

  public agregar(): void {
    if (this.causa !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/acciones/gestionAccion',
        this.causa.id_causa,
      ])
      this.estadosComunService.changeSelectedIndex(3);
    }
  }
  public onDeleteAccion($accion): void {
    Swal.fire({
      title: `¿Deseas eliminar la acción ${$accion.posicion}?`,
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.accionesService
          .deleteAccion($accion.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (respuestaBack) => {
              this.listarAcciones();
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
  public onEditarAccion($accion): void {
    if (this.causa !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/acciones/gestionAccion',
        this.causa.id_causa, $accion.id
      ]);
      localStorage.setItem('visualizar', 'false');
      this.estadosComunService.changeSelectedIndex(3);
    }
  }
  public onVisualizarAccion($accion): void {
    if (this.causa !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/acciones/gestionAccion',
        this.causa.id_causa, $accion.id
      ]);
      localStorage.setItem('visualizar', 'true');
      this.estadosComunService.changeSelectedIndex(3);
    }
  }
  public onCrearActividad($accion): void {
    if (this.causa !== null) {
      const accionAAgregarActividades: Accion[] = this.acciones.filter(
        (accion) => accion.idAccion === $accion.id
      );
      this.estadosComunService.changeAccion(accionAAgregarActividades[0]);
      this.router.navigate([
        '/home/planes-mejora/historial/actividades'
      ])
      this.estadosComunService.changeSelectedIndex(4);
    }
  }
  onVisualizarObservacion() {
    this.servicioPlan.setTipoPlan(4);
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
    this.estadosComunService.changeSelectedIndex(3);

    //this.verificarEstadoComponente()
  }
}
