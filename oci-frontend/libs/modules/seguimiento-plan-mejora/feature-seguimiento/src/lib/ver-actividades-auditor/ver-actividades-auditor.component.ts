import { MatDialog } from '@angular/material/dialog';
import { GestionPlanResponsableService } from './../../../../../gestion-plan-responsable/data-access/src/lib/services/gestion-plan-responsable.service';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { Soporte } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/model/soperte.model';
import { EvaluarEvidenciaComponent } from '../evaluar-evidencia/evaluar-evidencia.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActualizarAvanceComponent } from '../actualizar-avance/actualizar-avance.component';

@Component({
  selector: 'unicauca-ver-actividades-auditor',
  templateUrl: './ver-actividades-auditor.component.html',
  styleUrls: ['./ver-actividades-auditor.component.scss'],
})
export class VerActividadesAuditorComponent implements OnInit {
  private idPlan: string;
  private soportes: Soporte[] = [];
  private unsubscribe$ = new Subject();

  public nombrePlan = '';
  public fechaFinPlan = '';
  public listaActividades = [];
  public actividadSeleccionada: any;
  public listadoCompleto = [];

  public titulo = 'Evidencias de la actividad';

  estadoButtons: EstadoButtons = {
    crear: false,
    editar: true,
    eliminar: false,
    upload: false,
    visualizar: false,
  };

  public columnas: Columna[] = [
    {
      nombreCelda: 'nombreEvidencia',
      nombreCeldaHeader: 'Nombre evidencia',
    },
    { nombreCelda: 'linkDescarga', nombreCeldaHeader: 'Link' },
    { nombreCelda: 'estadoEvaluacion', nombreCeldaHeader: 'Estado' },
    {
      nombreCelda: 'fechaCargue',
      nombreCeldaHeader: 'Fecha Cargue',
      tipo: TipoColumna.FECHA_SIN_HORA,
    },
    {
      nombreCelda: 'observaciones',
      nombreCeldaHeader: 'Observaciones auditor',
    },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  public streamDatos$ = new BehaviorSubject<any[]>([]);
  public activarFiltroItems = true;
  public opened = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private actividadesService: ActividadesService,
    private gestionPlanResponsableService: GestionPlanResponsableService
  ) {}

  ngOnInit(): void {
    this.verificarEstadoComponente();
  }

  private verificarEstadoComponente(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((respuestaURL) => {
          this.idPlan = respuestaURL.get('idPlan');
          this.nombrePlan = respuestaURL.get('nombrePlan');
          this.fechaFinPlan = respuestaURL.get('fechaFin');
          return this.actividadesService.getActividadesPorPlan(this.idPlan);
        }),
        tap((objActividades) => {
          this.listaActividades = objActividades;
          this.actividadSeleccionada = this.listaActividades[0];

          this.actualizarSoporte();
        })
      )
      .subscribe();
  }

  private actualizarSoporte(): void {
    this.gestionPlanResponsableService
      .listadoSoportesIdActividad(this.actividadSeleccionada.id_Actividad)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (objSoporte) => {
          this.soportes = objSoporte;
          this.streamDatos$.next(this.soportes);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
  }

  public openPanel(actividad) {
    this.actividadSeleccionada = actividad;
    this.actualizarSoporte();
  }

  public onChangeActividad(): void {
    this.actualizarSoporte();
  }

  public onVolverAlTableroAuditor(): void {
    this.router.navigate(['/home/seguimiento-plan-mejora/seguimiento']);
  }

  public onEditar($event): void {
    const dialogRef = this.dialog.open(EvaluarEvidenciaComponent, {
      disableClose: true,
      width: '70%',
      data: $event,
    });
    dialogRef.afterClosed().subscribe((x) => this.actualizarSoporte());
  }

  public click(): void {
    this.opened = !this.opened;
  }

  public onActualizarAvance(): void {
    const info = {
      idActividad: this.actividadSeleccionada.id_Actividad,
      idPlan: this.idPlan,
      avance: this.actividadSeleccionada.avance,
    };
    const dialogRef = this.dialog.open(ActualizarAvanceComponent, {
      disableClose: true,
      width: '40%',
      data: info,
    });
    dialogRef.afterClosed().subscribe((x) => this.actualizarSoporte());
  }
}
