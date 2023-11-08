import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import {
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { ControlPlanDialogComponent } from '../control-plan-dialog/control-plan-dialog.component';
import { ExcelService } from 'libs/modules/estadisticas/data-access/src/lib/services/excel.service';
@Component({
  selector: 'unicauca-control-pm',
  templateUrl: './control-pm.component.html',
  styleUrls: ['./control-pm.component.scss'],
})
export class ControlPmComponent implements OnInit {
  titulo = 'Control Planes de Mejoramiento';
  planes: any[];

  streamDatos$ = new BehaviorSubject<any[]>([]);

  activarFiltroItems: boolean = true;

  columnas: Columna[] = [
    { nombreCelda: 'idPlan', nombreCeldaHeader: 'Identificador' },
    { nombreCelda: 'descripcionPlan', nombreCeldaHeader: 'Plan' },
    { nombreCelda: 'proceso', nombreCeldaHeader: 'Proceso Responsable' },
    { nombreCelda: 'fechaVencimiento', nombreCeldaHeader: 'Fecha Vencimiento' },
    {
      nombreCelda: 'avance',
      nombreCeldaHeader: 'Avance (%)',
    },
    {
      nombreCelda: 'cumplimiento',
      nombreCeldaHeader: 'Cumplimiento (%)',
    },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  estadoButtons: EstadoButtons = {
    crear: false,
    editar: false,
    eliminar: false,
    upload: false,
    visualizar: true,
  };

  /**Reporte */
  dataReporte: any[] = [];

  constructor(
    private planService: PlanService,
    private excelService: ExcelService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllPlanesControlPM();
  }

  private getAllPlanesControlPM(): void {
    this.planService.getPlanesControl().subscribe({
      next: (response: any) => {
        this.planes = response.planes;
        this.streamDatos$.next(this.planes);
      },
    });
  }

  public onVerDetalles(planSeleccionado): void {
    const planVer = this.planes.find(
      (plan) => plan.idPlan === planSeleccionado.idPlan
    );
    const dialogRef = this.dialog.open(ControlPlanDialogComponent, {
      width: '40%',
      data: planVer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private generateDataTable(): void {
    const dataReporte = [];

    this.planes.forEach((plan) => {
      dataReporte.push({
        identificador: plan.idPlan,
        plan: plan.descripcionPlan,
        proceso: plan.proceso,
        fechaInicio: plan.fechaInicio,
        fechaVencimiento: plan.fechaVencimiento,
        fechaSuscripcion:
          plan.fechaSuscripcion !== null ||
          plan.fechaSuscripcion !== undefined ||
          plan.fechaSuscripcion !== ''
            ? plan.fechaSuscripcion
            : 'No registrada',
        fechaUltimoSeguimiento:
          plan.fechaUltimoSeguimiento !== null ||
          plan.fechaUltimoSeguimiento !== undefined
            ? plan.fechaUltimoSeguimiento
            : 'No registrada',
        estado: plan.estado,
        avance: plan.avance,
        cumplimiento: plan.cumplimiento,
        responsable: plan.nombreLiderAuditor,
        observaciones:
          plan.observaciones.length > 0 ? plan.observaciones.join('\n\n') : '',
        //tipoObservacion: plan.observaciones ? plan.observaciones.tipoObservacion : ''
      });
      debugger;
    });

    const dataExcelTable = {
      reportHeading: 'Control Planes de Mejoramiento',
      columns: [
        'Identificador',
        'Plan Mejora',
        'Proceso Responsable',
        'Fecha Inicio',
        'Fecha Vencimiento',
        'Fecha Suscripción',
        'Fecha Último Seguimiento',
        'Estado',
        'Avance (%)',
        'Cumplimiento (%)',
        'Responsable',
        'Observaciones',
      ],
      json: dataReporte,
    };

    this.dataReporte.push(dataExcelTable);
  }

  public exportExcel(): void {
    this.generateDataTable();
    this.excelService.exportTables(
      this.dataReporte,
      'ReporteControlPM',
      'ControlPM'
    );
  }
}
