import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import {
  Proceso,
  ProcesoService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { PlanService } from '@unicauca/modules/plan-mejoramiento/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { estadosActividad } from '@unicauca/core';
import { HttpClient } from '@angular/common/http';
import { CountService } from '@unicauca/modules/estadisticas/data-access';
import { ExcelService } from 'libs/modules/estadisticas/data-access/src/lib/services/excel.service';

@Component({
  selector: 'unicauca-procesos-pmi',
  templateUrl: './procesos-pmi.component.html',
  styleUrls: ['./procesos-pmi.component.scss'],
})
export class ProcesosPmiComponent implements OnInit {
  titulo = 'Listado de procesos';

  streamDatos$ = new BehaviorSubject<any[]>([]);
  procesos: Proceso[];

  activarFiltroItems: boolean = true;

  columnas: Columna[] = [
    { nombreCelda: 'idProceso', nombreCeldaHeader: 'Identificador' },
    { nombreCelda: 'nombreProceso', nombreCeldaHeader: 'Nombre Proceso' },
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

  /*Plan de Mejora Institucional*/
  cantidades = {
    planes: { titulo: 'Planes de Mejora', valor: '0' },
    hallazgos: { titulo: 'Hallazgos', valor: '0' },
    acciones: { titulo: 'Acciones', valor: '0' },
    actividades: { titulo: 'Actividades', valor: '0' },
  };

  /**PIE CHART */
  tituloLegend: string = 'Estado Actividades';
  activities = [];
  data: any[] = [];

  /**REPORTE*/
  dataReporte: any[] = [];
  columns: any[] = [];
  footerData: any[][] = [];

  constructor(
    private router: Router,
    private procesoService: ProcesoService,
    private hallazgoService: HallazgoService,
    private planService: PlanService,
    private actividadesService: ActividadesService,
    private accionesService: AccionesService,
    private countService: CountService,
    private excelService: ExcelService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getTodosProcesos();
    this.getNoPlanes();
    this.getNoHallazgos();
    this.getNoAcciones();
    this.getActividades();
  }

  private getTodosProcesos(): void {
    this.procesoService.getProcesos().subscribe(
      (res) => {
        this.procesos = res.procesos;
        this.streamDatos$.next(this.procesos);
      },
      () => {
        this.streamDatos$.next([]);
      }
    );
  }

  private getNoPlanes(): void {
    this.planService.getPlanes().subscribe((response: any) => {
      this.cantidades['planes'].valor = response.planes.length.toString();
    });
  }

  private getNoHallazgos(): void {
    this.hallazgoService.getHallazgosActivos().subscribe((response) => {
      this.cantidades['hallazgos'].valor = response.hallazgos.length.toString();
    });
  }

  private getNoAcciones(): void {
    this.accionesService.countAccionesActivas().subscribe((response: any) => {
      this.cantidades['acciones'].valor = response.numAcciones.toString();
    });
  }

  private async getActividades() {
    await this.actividadesService
      .getActividadesActivas()
      .toPromise()
      .then((response) => {
        this.activities = response.actividades;
        this.cantidades[
          'actividades'
        ].valor = response.actividades.length.toString();
      });
    this.data = this.countService.countEstado(
      this.activities.slice(),
      estadosActividad
    );
  }

  private async getEstadoActividades() {
    let promise = await this.actividadesService
      .countEstadoActividades()
      .toPromise();
    let cantidades = promise.cantidades;
    let lista = [];
    cantidades.forEach((element) => {
      lista.push({ name: element[1], value: element[0] });
    });
    this.data = lista;
  }

  public onVerDetalles(procesoSeleccionado): void {
    this.router.navigate([
      `home/estadisticas/all/proceso/${procesoSeleccionado.idProceso}`,
    ]);
    localStorage.setItem('proceso', procesoSeleccionado.nombreProceso);
  }

  /**MÉTODOS NECESARIOS PARA GENERAR EL REPORTE */
  private generateDataPMI(): any {
    const columns = ['Elemento', 'Cantidad'];
    const dataReporte = [
      {
        elemento: this.cantidades.planes.titulo,
        cantidad: this.cantidades.planes.valor,
      },
      {
        elemento: this.cantidades.hallazgos.titulo,
        cantidad: this.cantidades.hallazgos.valor,
      },
      {
        elemento: this.cantidades.acciones.titulo,
        cantidad: this.cantidades.acciones.valor,
      },
      {
        elemento: this.cantidades.actividades.titulo,
        cantidad: this.cantidades.actividades.valor,
      },
    ];
    const dataExcelTable = {
      reportHeading: 'Plan de Mejora Institucional',
      columns: columns,
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private generateDataTable(): any {
    const dataReporte = [];

    this.procesos.forEach((proceso) => {
      dataReporte.push({
        identificador: proceso.idProceso,
        nombre: proceso.nombreProceso,
      });
    });

    const dataExcelTable = {
      reportHeading: 'Listado de procesos',
      columns: ['Identificador', 'Nombre del Proceso'],
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private genetareDataGraphic(): any {
    const dataReporte = [];
    let total = 0;
    this.data.forEach((item) => {
      total += item.value;
    });
    this.data.forEach((element) => {
      dataReporte.push({
        estado: element.name.split(':')[0],
        cantidad: element.value,
        porcentaje: Math.round((element.value * 100) / total),
      });
    });
    const dataExcelTable = {
      reportHeading: 'Estados Actividades PMI',
      columns: ['Estado', 'Cantidad', 'Porcentaje (%)'],
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private generateDataReport(): void {
    this.dataReporte.push(this.generateDataPMI());
    if (this.activities.length > 0) {
      this.dataReporte.push(this.genetareDataGraphic());
    }
    this.dataReporte.push(this.generateDataTable());
  }

  public exportExcel(): void {
    this.generateDataReport();
    this.excelService.exportTables(
      this.dataReporte,
      'ReportePMI',
      'estadisticas'
    );
    /*this.excelService.exportAsExcelFile(
      'REPORTE PMI',
      '',
      this.columns,
      this.dataReporte,
      null,
      'reportePMI',
      'estadisticas'
    );*/
  }
}
