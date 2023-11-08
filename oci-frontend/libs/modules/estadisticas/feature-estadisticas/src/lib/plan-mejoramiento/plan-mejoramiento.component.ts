import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { ActividadDialogComponent } from '../actividad-dialog/actividad-dialog.component';
import { CountService } from '@unicauca/modules/estadisticas/data-access';

import { escalaAvance } from '@unicauca/core';
import { estadosActividad } from '@unicauca/core';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { ExcelService } from 'libs/modules/estadisticas/data-access/src/lib/services/excel.service';

@Component({
  selector: 'unicauca-plan-mejoramiento',
  templateUrl: './plan-mejoramiento.component.html',
  styleUrls: ['./plan-mejoramiento.component.scss'],
})
export class PlanMejoramientoComponent implements OnInit {
  streamDatos$ = new BehaviorSubject<any[]>([]);
  titulo = 'Actividades';
  idPlan: string;
  actividades: any[];

  avance: number = 0;
  cumplimiento: number = 0;
  noAcciones: number = 0;

  nombrePlan: string = '';

  activarFiltroItems: boolean = true;

  columnas: Columna[] = [
    { nombreCelda: 'idActividad', nombreCeldaHeader: 'Identificador' },
    {
      nombreCelda: 'actividad',
      nombreCeldaHeader: 'Actividad',
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

  datosGrafico = [];

  /*datosGrafico = {
    estadoActividades: {
      titulo: 'Estado Actividades',
      datos: [],
    },
    avanceActividades: {
      titulo: 'Avance Actividades',
      datos: [],
    },
  };*/

  /*Reporte*/
  dataReporte: any[] = [];

  constructor(
    private actividadesService: ActividadesService,
    private accionesService: AccionesService,
    private countService: CountService,
    private excelService: ExcelService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idPlan = params.idPlan.replace('%', '/');
    });
    this.nombrePlan = localStorage.getItem('nombrePlan');
    this.getFullActividades();
    this.getAccionesPlan();
  }

  async getFullActividades() {
    await this.actividadesService
      .getActividadesPorPlan(this.idPlan)
      .toPromise()
      .then(
        (response) => {
          this.actividades = response;
          let actividadesResumen = [];
          response.forEach((element) => {
            actividadesResumen.push({
              idActividad: element.id_Actividad,
              actividad: element.descripcionActividad,
            });
          });
          this.streamDatos$.next(actividadesResumen);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    this.getDataGraficoActividades();
    this.getAvanceCumplimientoActividades();
  }

  async getAccionesPlan() {
    await this.accionesService
      .countAccionesPorPlan(this.idPlan)
      .toPromise()
      .then((response) => {
        this.noAcciones = response.numAcciones;
      });
  }

  public getDataGraficoActividades() {
    let dataAvanceActividades = this.countService.countAvance(
      this.actividades.slice(),
      escalaAvance
    );
    let dataEstadoActividades = this.countService.countEstado(
      this.actividades.slice(),
      estadosActividad
    );

    if (dataAvanceActividades !== []) {
      const estadoActividades = {
        titulo: 'Estado Actividades',
        datos: dataEstadoActividades,
      };
      this.datosGrafico.push(estadoActividades);
    }

    if (dataEstadoActividades !== []) {
      const avanceActividades = {
        titulo: 'Avance Actividades',
        datos: dataAvanceActividades,
      };
      this.datosGrafico.push(avanceActividades);
    }
    /*this.datosGrafico.estadoActividades.datos = dataEstadoActividades;
    this.datosGrafico.avanceActividades.datos = dataAvanceActividades;*/
  }

  public getAvanceCumplimientoActividades() {
    let sumaAvance = 0;
    let promedioAvance = 0;
    let sumaCumplimiento = 0;
    let promedioCumplimiento = 0;
    this.actividades.forEach((actividad) => {
      sumaAvance += actividad.avance;
      if (actividad.cumplimiento === 'SI') {
        sumaCumplimiento += 1;
      }
    });
    if (sumaAvance > 0) {
      promedioAvance = sumaAvance / this.actividades.length;
    }
    if (sumaCumplimiento > 0) {
      promedioCumplimiento = (sumaCumplimiento / this.actividades.length) * 100;
    }
    this.avance = promedioAvance;
    this.cumplimiento = promedioCumplimiento;
  }

  public onVerDetalles(actividadSeleccionada) {
    const actividadVer = this.actividades.find(
      (actividad) =>
        actividad.id_Actividad === actividadSeleccionada.idActividad
    );
    const dialogRef = this.dialog.open(ActividadDialogComponent, {
      width: '40%',
      data: actividadVer,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  /**MÉTODOS NECESARIOS PARA GENERAR EL REPORTE EXCEL */
  private generateDataElementos(): any {
    const columns = ['Elemento', 'Valor'];
    const dataReporte = [
      {
        elemento: '# Acciones',
        cantidad: this.noAcciones,
      },
      {
        elemento: 'Avance (%)',
        cantidad: this.avance,
      },
      {
        elemento: 'Cumplimiento (%)',
        cantidad: this.cumplimiento,
      },
    ];
    const dataExcelTable = {
      reportHeading: 'Datos Plan Mejora',
      columns: columns,
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private generateDataTable(): any {
    const dataReporte = [];

    this.actividades.forEach((actividad) => {
      dataReporte.push({
        identificador: actividad.id_Actividad,
        nombre: actividad.descripcionActividad,
      });
    });

    const dataExcelTable = {
      reportHeading: 'Listado de actividades',
      columns: ['Identificador', 'Descripción Actividad'],
      json: dataReporte,
    };
    debugger;
    return dataExcelTable;
  }

  private genetareDataGraphic(): any {
    const dataReporte = [];
    let dataTable = [];
    const encabezados = ['estadoActividades', 'avanceActividades'];

    encabezados.forEach((header) => {
      if (this.datosGrafico[header].datos.length > 0) {
        let total = 0;
        this.datosGrafico[header].datos.forEach((item) => {
          total += item.value;
        });
        this.datosGrafico[header].datos.forEach((element) => {
          dataTable.push({
            estado: element.name.split(':')[0],
            cantidad: element.value,
            porcentaje: Math.round((element.value * 100) / total),
          });
        });
        const dataExcelTable = {
          reportHeading: this.datosGrafico[header].titulo,
          columns: ['Estado', 'Cantidad', 'Porcentaje (%)'],
          json: dataTable,
        };
        dataReporte.push(dataExcelTable);
        dataTable = [];
      }
    });

    return dataReporte;
  }

  private generateDataReport(): void {
    if (this.actividades.length > 0) {
      this.dataReporte.push(this.generateDataTable());
    }
    this.dataReporte.push(this.generateDataElementos());

    const dataGraficos = this.genetareDataGraphic();
    if (dataGraficos.length > 0) {
      dataGraficos.forEach((table) => {
        this.dataReporte.push(table);
      });
    }
  }

  public exportExcel(): void {
    this.generateDataReport();
    this.excelService.exportTables(
      this.dataReporte,
      'ReportePlanMejora',
      this.nombrePlan
    );
  }
}
