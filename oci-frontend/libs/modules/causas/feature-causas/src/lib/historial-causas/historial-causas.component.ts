import { AuthService } from './../../../../../../auth/src/lib/data-access/auth/auth.service';
import { takeUntil, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import {Causa, plan, PlanService} from '@unicauca/modules/plan-mejoramiento/data-access';

import {
  EstadoButtons,
  Columna,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { EstadosComunService } from '@unicauca/core';
import { CausaService } from '@unicauca/modules/causas/data-access';
import { Hallazgo } from '@unicauca/modules/plan-mejoramiento/data-access';

@Component({
  selector: 'unicauca-historial-causas',
  templateUrl: './historial-causas.component.html',
  styleUrls: ['./historial-causas.component.scss'],
})
export class HistorialCausasComponent implements OnInit {
  nombrePlan = '';
  nombreHallazgo = '';
  titulo = '';
  activarFiltroItems = true;
  unsubscribe$ = new Subject();

  hallazgo: Hallazgo;
  causas: Causa[]= [];
  planes: plan[];

  esAuditor = false;
  hintAgregarOVerAuditor = '';

  estadoButtons: EstadoButtons = {};

  columnas: Columna[] = [
    { nombreCelda: 'posicion', nombreCeldaHeader: 'Número' },
    { nombreCelda: 'causa', nombreCeldaHeader: 'Descripción' },
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
    private causaService: CausaService,
    private estadosComunService: EstadosComunService,
    private servicioPlan: PlanService,
  ) {}

  ngOnInit(): void {
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.hintAgregarOVerAuditor = (this.esAuditor ? 'Ver' : 'Agregar');
    this.llenarBotones();
    this.estadosComunService.customHallazgo
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((msg) => (this.hallazgo = msg));
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.listarCausas();
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


  private listarCausas(): void {
    if (this.hallazgo !== null) {
      this.nombrePlan = this.hallazgo.objPlan.nombre;
      this.nombreHallazgo = this.hallazgo.hallazgo;
      this.causaService
        .getCausaPorIdHallazgo(this.hallazgo.id_hallazgo)
        .pipe(
          takeUntil(this.unsubscribe$),
          tap((res)=> this.causas = res),
          map((listadoCausas: any[]) =>
            listadoCausas.map((causa, index) => ({
              id: causa.id_causa,
              posicion: index + 1,
              causa: causa.causa,
              objHallazgo: causa.objHallazgo,
            }))
          )
        )
        .subscribe(
          (datosCausa) => {
            this.streamDatos$.next(datosCausa);
          },
          () => {
            this.streamDatos$.next([]);
          }
        );
    }
  }

  public agregar(): void {
    if (this.hallazgo !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/causas/gestionCausa',
        this.hallazgo.id_hallazgo,
      ])
      this.estadosComunService.changeSelectedIndex(2);
    }
  }
  public onDeleteCausa($causa): void {
    Swal.fire({
      title: `¿Deseas eliminar la causa ${$causa.posicion}?`,
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.causaService
          .deleteCausa($causa.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (respuestaBack) => {
              this.listarCausas();
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
  public onEditarCausa($causa): void {
    if (this.hallazgo !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/causas/gestionCausa',
        this.hallazgo.id_hallazgo, $causa.id
      ]);
      localStorage.setItem('visualizar', 'false');
      this.estadosComunService.changeSelectedIndex(2);
    }
  }
  public onVisualizarCausa($causa): void {
    if (this.hallazgo !== null) {
      this.router.navigate([
        '/home/planes-mejora/historial/causas/gestionCausa',
        this.hallazgo.id_hallazgo, $causa.id
      ]);
      localStorage.setItem('visualizar', 'true');
      this.estadosComunService.changeSelectedIndex(2);
    }
  }
  public onCrearAccion($causa): void {
    if (this.hallazgo !== null) {
      const causaAAgregarAccion: Causa[] = this.causas.filter(
        (causa) => causa.id_causa === $causa.id
      );
      this.estadosComunService.changeCausa(causaAAgregarAccion[0]);
      this.router.navigate([
        '/home/planes-mejora/historial/acciones'
      ])
      this.estadosComunService.changeSelectedIndex(3);
    }
  }
  onVisualizarObservacion() {
    this.servicioPlan.setTipoPlan(3);
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
    this.estadosComunService.changeSelectedIndex(2);

    //this.verificarEstadoComponente()
  }
}
