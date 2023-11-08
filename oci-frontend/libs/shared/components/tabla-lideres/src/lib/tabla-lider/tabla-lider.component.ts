import { Columna, TipoColumna } from '@unicauca/shared/components/tabla';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'unicauca-tabla-lider',
  templateUrl: './tabla-lider.component.html',
  styleUrls: ['./tabla-lider.component.scss']
})
export class TablaLiderComponent implements OnInit, OnDestroy {

  @Input() inTituloTabla: string;
  @Input() inLider: string;
  @Input() inColumnas: Columna[];
  @Input() inStreamDatos$: BehaviorSubject<any[]>;
  @Input() inActivarFiltroItems = false;
  @Input() inPlaceholderFiltroItems: string;
  @Input() selectionLider = new SelectionModel<any>(true, []);
  @Input() validadorCheckRequerido = true;
  @Input() validadorDisabledCheck = true;

  @Output() outSeleccionarUnicaFila$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  nombresCeldasTabla: string[];
  tipoColumna = TipoColumna;
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  siLaTablaNoTieneDatos = false;
  constructor() {}

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
        // console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      });
    }

    // if (streamDatos$) {
    //   streamDatos$.pipe(takeUntil(this.destroy$)).subscribe((datos) => {
    //     datos.length == 0
    //       ? (this.siLaTablaNoTieneDatos = true)
    //       : (this.siLaTablaNoTieneDatos = false);
    //     this.dataSource = new MatTableDataSource<any[]>(datos);
    //     this.dataSource.paginator = this.paginator;
    //   });
    // }
  }

  onSeleccionarUnicaFila(elemento): void {
    this.outSeleccionarUnicaFila$.emit(elemento);
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
