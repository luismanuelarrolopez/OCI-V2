import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';

import {
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { HallazgoService } from '@unicauca/modules/hallazgos/data-access';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { CountService } from '@unicauca/modules/estadisticas/data-access';
import { escalaAvance, estadosActividad, estadosPlan } from '@unicauca/core';
import { ExcelService } from 'libs/modules/estadisticas/data-access/src/lib/services/excel.service';

@Component({
  selector: 'unicauca-proceso-individual',
  templateUrl: './proceso-individual.component.html',
  styleUrls: ['./proceso-individual.component.scss'],
})
export class ProcesoIndividualComponent implements OnInit {
  titulo = 'Planes de Mejoramiento';
  idProceso: number;
  nombreProceso: string;
  planes: plan[];

  actividadesProceso: any[] = [];

  /*INFORMACIÓN TABLA*/
  activarFiltroItems: boolean = true;
  streamDatos$ = new BehaviorSubject<any[]>([]);

  columnas: Columna[] = [
    { nombreCelda: 'idPlanMejoramiento', nombreCeldaHeader: 'Identificador' },
    {
      nombreCelda: 'nombre',
      nombreCeldaHeader: 'Nombre Plan de Mejora',
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

  /*INFORMACION DEL PROCESO*/
  cantidades = {
    planes: { titulo: 'Planes de Mejora', valor: '0' },
    hallazgos: { titulo: 'Hallazgos', valor: '0' },
    acciones: { titulo: 'Acciones', valor: '0' },
    actividades: { titulo: 'Actividades', valor: '0' },
  };

  /*PIE-CHART PLANES*/

  datosGrafico: any[] = [];

  /*datosGrafico = {
    planes: {
      titulo: 'Estado Planes de Mejora',
      datos: [],
    },
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
    private router: Router,
    private route: ActivatedRoute,
    private planService: PlanService,
    private hallazgoService: HallazgoService,
    private accionesService: AccionesService,
    private actividadesService: ActividadesService,
    private countService: CountService,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    //Get id from the route
    this.route.params.subscribe((params) => {
      this.idProceso = params.idProceso;
    });
    this.nombreProceso = localStorage.getItem('proceso');

    //Get data from database
    this.getAllPlanes();
    this.getHallazgosPorProceso();
    this.getAccionesPorProceso();
    this.getActividadesPorProceso();
  }

  async getAllPlanes() {
    await this.planService
      .getPlanesPorProceso(this.idProceso)
      .toPromise()
      .then((response) => {
        this.planes = response.planes;
        this.cantidades['planes'].valor = this.planes.length.toString();
        this.streamDatos$.next(this.planes);
      });
    let dataPlanes = this.countService.countEstado(
      this.planes.slice(),
      estadosPlan
    );
    const planes = {
      titulo: 'Estado Planes de Mejora',
      datos: dataPlanes,
    };
    this.datosGrafico.push(planes);
  }

  public getHallazgosPorProceso(): void {
    this.hallazgoService
      .getHallazgosProceso(this.idProceso)
      .subscribe((response) => {
        this.cantidades[
          'hallazgos'
        ].valor = response.hallazgo.length.toString();
      });
  }

  public getAccionesPorProceso(): void {
    this.accionesService
      .countAccionesPorProceso(this.idProceso)
      .subscribe((response) => {
        this.cantidades['acciones'].valor = response.numAcciones.toString();
      });
  }

  async getActividadesPorProceso() {
    let actividades = [];
    await this.actividadesService
      .getActividadesPorProceso(this.idProceso)
      .toPromise()
      .then((response) => {
        this.cantidades[
          'actividades'
        ].valor = response.actividades.length.toString();
        actividades = response.actividades;
      });
    this.getDataActividades(actividades.slice());
  }

  async getDataActividades(actividades: any) {
    let dataAvanceActividades = this.countService.countAvance(
      actividades.slice(),
      escalaAvance
    );
    let dataEstadoActividades = this.countService.countEstado(
      actividades.slice(),
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

  public onVerDetalles(planSeleccionado): void {
    const planVer: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.idPlanMejoramiento
    );

    let idPlan = planVer[0].idPlanMejoramiento.replace('/', '%');
    this.router.navigate([`home/estadisticas/all/plan-mejora/${idPlan}`]);

    localStorage.setItem('nombrePlan', planVer[0].nombre);
  }

  /**MÉTODOS NECESARIOS PARA GENERAR EL REPORTE EXCEL */
  private generateDataElementos(): any {
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
      reportHeading: 'Datos Proceso',
      columns: columns,
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private generateDataTable(): any {
    const dataReporte = [];

    this.planes.forEach((plan) => {
      dataReporte.push({
        identificador: plan.idPlanMejoramiento,
        nombre: plan.nombre,
      });
    });

    const dataExcelTable = {
      reportHeading: 'Listado de planes',
      columns: ['Identificador', 'Plan de Mejora'],
      json: dataReporte,
    };
    return dataExcelTable;
  }

  private genetareDataGraphic(): any {
    const dataReporte = [];
    let dataTable = [];
    const encabezados = ['planes', 'estadoActividades', 'avanceActividades'];

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
    if (this.planes.length > 0) {
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
      'ReporteProceso',
      this.nombreProceso
    );
  }
}
