import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@unicauca/auth';
import { TableroResponsable } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/model/tableroResponsable.model';
import { GestionPlanResponsableService } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/services/gestion-plan-responsable.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'unicauca-tablero-responsable',
  templateUrl: './tablero-responsable.component.html',
  styleUrls: ['./tablero-responsable.component.scss'],
})
export class TableroResponsableComponent implements OnInit {
  private idPersona: number;
  private listadoTableroResponsable: TableroResponsable[];
  private unsubscribe$ = new Subject();
  private idUsuario : any;
  public titulo: string;

  public columnas: Columna[] = [
    { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Nombre del plan' },
    { nombreCelda: 'estadoPlan', nombreCeldaHeader: 'Estado' },
    {
      nombreCelda: 'fechaUltimaModificacion',
      nombreCeldaHeader: 'Fecha última modificación',
      tipo: TipoColumna.FECHA_SIN_HORA,
    },
    {
      nombreCelda: 'fechaLimite',
      nombreCeldaHeader: 'Fecha Fin',
      tipo: TipoColumna.FECHA_SIN_HORA,
    },
    {
      nombreCelda: 'tipoAccion',
      nombreCeldaHeader: 'Descripción de la acción',
    },

    { nombreCelda: 'nombreAuditor', nombreCeldaHeader: 'Líder auditor' },
    { nombreCelda: 'avance', nombreCeldaHeader: 'Avance(%)' },
    // { nombreCelda: 'estadoActividad', nombreCeldaHeader: 'Efectividad' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Evidencias',
      tipo: TipoColumna.ACCIONES,
    },
  ];
  public estadoButtons: EstadoButtons = {
    crear: false,
    editar: false,
    eliminar: false,
    visualizar: false,
    adjuntarEvidencia: true,
    upload: false,
  };

  public streamDatos$ = new BehaviorSubject<any[]>([]);
  public activarFiltroItems = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private gestionPlanResponsableService: GestionPlanResponsableService
  ) {}

  ngOnInit(): void {
    this.idPersona = this.authService.getUsuario().objPerson.id;
    this.authService.setidUsuario(this.idPersona)
    this.gestionPlanResponsableService
      .tableroResponsable(this.idPersona)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.listadoTableroResponsable = res;
        this.streamDatos$.next(this.listadoTableroResponsable);
      });
  }

  public outAdjuntarEvidencia($event): void {
    this.router.navigate([
      '/home/gestion-plan-responsable/gestion-plan-responsable/actividades',
      $event.idAccion,
      $event.nombrePlan,
      $event.fechaLimite,
      $event.tipoAccion,
    ]);
  }
}
