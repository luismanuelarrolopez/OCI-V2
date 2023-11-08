import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { EstadoButtons, Columna, TipoColumna } from '../model/tabla.model';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'unicauca-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit, OnDestroy {
  @Input() inTituloTabla: string;
  @Input() inNombreAgregar = '';
  @Input() inNombreAgregarOVerAuditor = 'Agregar';
  @Input() inVerEvidencia = '';
  @Input() inColumnas: Columna[];
  @Input() inStreamDatos$: BehaviorSubject<any[]>;
  @Input() inActivarFiltroItems = false;
  @Input() inPlaceholderFiltroItems: string;
  @Input() inActivarBtns: EstadoButtons = {
    crear: true,
    editar: true,
    eliminar: true,
    visualizar: true,
    upload: true,
    seleccionar: false,
    adjuntarEvidencia: false
  };

  @Output() outCrear$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outEditar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outEliminar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outVisualizar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outSeleccionar$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outAdjuntarEvidencia$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outcrearObservacion$: EventEmitter<any> = new EventEmitter<any>();
  @Output() outverObservacion$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  nombresCeldasTabla: string[];
  tipoColumna = TipoColumna;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  siLaTablaNoTieneDatos = false;
  constructor(private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página'; //para que material este en español
    this.crearNombreCeldasTabla(this.inColumnas);
    this.llenarDatosTabla(this.inStreamDatos$);
  }

  private crearNombreCeldasTabla(columnas: Columna[]): void {
    this.nombresCeldasTabla = columnas.map((columna) => columna.nombreCelda);
  }

  private llenarDatosTabla(streamDatos$: BehaviorSubject<any[]>): void {
    if (streamDatos$) {
      streamDatos$.pipe(takeUntil(this.destroy$)).subscribe((datos) => {
        datos.length == 0
          ? (this.siLaTablaNoTieneDatos = true)
          : (this.siLaTablaNoTieneDatos = false);
        this.dataSource = new MatTableDataSource<any[]>(datos);
        this.dataSource.paginator = this.paginator;
        // this.changeDetectorRefs.markForCheck();
      });
    }
  }

  onCrearHallazgo(elemento): void {
    this.outCrear$.emit(elemento);
  }
  onVisualizarHallazgo(elemento): void {
    this.outVisualizar$.emit(elemento);
  }
  onEditarHallazgo(elemento): void {
    this.outEditar$.emit(elemento);
  }
  onEliminarHallazgo(elemento): void {
    this.outEliminar$.emit(elemento);
  }
  onCrearObservacion(elemento): void {
    this.outcrearObservacion$.emit(elemento);
  }
  onVerObservacion(elemento): void {
    this.outverObservacion$.emit(elemento);
  }
  onSeleccionarElemento(elemento): void{
    this.outSeleccionar$.emit(elemento);
  }
  onAdjuntarEvidencia(elemento): void{
    this.outAdjuntarEvidencia$.emit(elemento);
  }

  onAplicarFiltroItems(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
