import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@unicauca/auth';
import {
  Person,
  estadosPlan,
  UserService,
  EstadosComunService,
  logins,
} from '@unicauca/core';
import {
  plan,
  Proceso,
  PlanService,
  ProcesoService,
  ObservacionesService,
  Observacion,
  ResumenPlan,
  cambiarTextoAFecha,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, timestamp } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ObservacionesComponent } from '../observaciones/observaciones.component';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  codeUrl = '';

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor(private servicioPlan: PlanService) {}

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(this.modoEdicion, 0);

    // Notify the change.
    this.dataChange.next(data);
  }
  public setCode(codeUrl) {
    this.codeUrl = codeUrl;
    this.modoEdicion();
  }
  modoEdicion() {
    this.servicioPlan.getResumenPlan(this.codeUrl).subscribe(
        (res: ResumenPlan[]) => {
          const respuesta = this.arreglarResumenPlan(res);
          const data = this.buildFileTree(respuesta, 0);
          this.dataChange.next(data);
        },
        (err) => {
          if (err.status === 404) {
            this.dataChange.next([]);
          }
        }
    );
  }

  private fnActividad(listaObjs: any[]) {
    const objeto = Object.assign({}, listaObjs);
    const objs = this.getIdsNoRepetidosPorObjeto(objeto);
    const listaIDs = Object.keys(objs).map(Number);
    const lis = listaIDs.map((id) => ({
      ...objs['actividad'],
      [this.getNombreKeyObjeto(objeto)]: Object.values(objeto)
          .filter((obj) => obj[this.getNombreIdPorObjeto(obj)] === id)
          .map((obj) =>
              this.getNombreKeyObjeto3(obj) !== undefined
                  ? obj[this.getNombreKeyObjeto3(obj)]
                  : obj
          ),
    }));
    console.log(lis);

    return lis;
  }

  private fn(listaObjs: any[]) {
    const objeto = Object.assign({}, listaObjs);
    const objs = this.getIdsNoRepetidosPorObjeto(objeto);
    const listaIDs = Object.keys(objs).map(Number);
    listaIDs.map((id) => ({
      ...objs[id],
      [this.getNombreKeyObjeto(objeto)]: Object.values(objeto)
          .filter((obj) => obj[this.getNombreIdPorObjeto(obj)] === id)
          .map((obj) =>
              this.getNombreKeyObjeto2(obj) !== undefined
                  ? obj[this.getNombreKeyObjeto2(obj)]
                  : obj
          ),
    }));
    console.log('fn: ', listaIDs);

    return listaIDs.map((id) => ({
      ...objs[id],
      [this.getNombreKeyObjeto(objeto)]: Object.values(objeto)
          .filter((obj) => obj[this.getNombreIdPorObjeto(obj)] === id)
          .map((obj) =>
              this.getNombreKeyObjeto2(obj) !== undefined
                  ? obj[this.getNombreKeyObjeto2(obj)]
                  : obj
          ),
    }));
  }

  private getObjetoContenido(objeto: any): unknown {
    return Object.values(objeto).find((obj) => typeof obj === 'object');
  }

  private getIdsNoRepetidosPorObjeto(objeto: any) {
    return Object.entries(objeto).reduce(
        (acc, [indice, obj]: any[]) => ({
          ...acc,
          [obj[this.getNombreIdPorObjeto(obj)]]: obj,
        }),
        {}
    );
  }

  private getNombreIdPorObjeto(objeto: any): string {
    return Object.keys(objeto).find((key) => key.slice(0, 3) === 'id_');
  }

  private getNombreKeyObjeto(objeto: any): string {
    return Object.entries(this.getObjetoContenido(objeto)).find((arr) =>
        typeof arr[1] === 'object' ? arr[0] : null
    )[0];
  }

  private getNombreKeyObjeto2(objeto: any): string {
    return Object.keys(this.getObjetoContenido(objeto)).find((key) =>
        typeof objeto[key] === 'object' ? key : null
    );
  }

  private getNombreKeyObjeto3(objeto: any): string {
    return Object.keys(objeto).find((key) =>
        typeof objeto[key] === 'object' ? key : null
    );
  }

  arreglarResumenPlan(resumenBack: any[]) {
    const listaIdsHallazgos = resumenBack.reduce(
        (acc, el) => ({ ...acc, [el.id_HALLAZGO]: el }),
        {}
    );
    const listaCausas = Object.keys(listaIdsHallazgos).map((idHallazgo) => ({
      idHallazgo,
      causas: resumenBack
          .filter((item) => item.id_HALLAZGO === +idHallazgo)
          .map((item) => item.causa)
          .reduce(
              (acc, el) => ({
                ...acc,
                [el.id_CAUSA]: el,
              }),
              {}
          ),
    }));
    // console.log('listaCausas', listaCausas);
    // const listaHallazgos = this.fn(resumenBack);
    // const listaCausas1 = listaHallazgos.map(obj => ({...obj, causa: this.fn(obj.causa)}))
    // const listaCausar = listaCausas1.map(obj => (console.log('lis: ',this.fn(obj.causa))))
    // const listaAccion = listaCausas1.map(obj => ({...obj, causa: obj.causa.map(obj => ({...obj, accion: this.fn(obj.accion)}))}))
    // const listaFinal = listaAccion.map(obj => ({...obj, causa: obj.causa.map(obj => ({...obj,  accion: obj.accion.map(obj =>  ({...obj, actividad: this.fn(obj.actividad)}) )}))}))

    // console.log('TEST', listaFinal);

    return [listaCausas];
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      if (key === 'causa' || key === 'accion' || key === 'actividad') {
        node.item = 'Lista de ' + key;
      } else {
        node.item = key;
      }

      if (typeof value === 'object') {
        if (value.length !== 1) {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          const esUnArray = Object.keys(value[0]).find(
              (key) => key.slice(0, 3) === 'id_'
          );
          if (value[0][esUnArray] !== 0) {
            node.children = this.buildFileTree(value, level + 1);
          } else {
            node.item = null;
          }
        }
      } else {
        node.item = key.replace(/_/g, ' ').toLocaleUpperCase() + ': ' + value;
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'unicauca-ver-plan',
  templateUrl: './ver-plan.component.html',
  styleUrls: ['./ver-plan.component.scss'],
  providers: [ChecklistDatabase],
})
export class VerPlanComponent implements OnInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
      true /* multiple */
  );

  formularioPlan: FormGroup;
  noHayDatosParaMostrar = false;

  esAuditor = false;
  esLiderProceso = false;

  modoEdicionActivo: boolean;
  public objPlan: plan = new plan();
  private observacion: Observacion[] = [];
  public idPlanMejora = '';
  public codeUrl: string;
  isDisabled = true;
  public estadoObservacion;
  public nombreTipo : string;

  public auditores: Person[] = [];
  public lideresProceso: Person[] = [];

  public procesos: Proceso[];
  mostrarBtnVolver: boolean;
  titulo: string;

  public listadoEstado = estadosPlan;

  columnas: Columna[] = [];
  estadoButtons: EstadoButtons = {
    crear: false,
    editar: true,
    eliminar: true,
    upload: false,
    visualizar: false,
  };

  streamDatos$ = new BehaviorSubject<any[]>([]);
  activarFiltroItems = true;

  constructor(
      private router: Router,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private servicioPlan: PlanService,
      private procesoService: ProcesoService,
      private activatedRoute: ActivatedRoute,
      private _database: ChecklistDatabase,
      private observacionesService: ObservacionesService,
      public dialog: MatDialog,
      private estadosComunService: EstadosComunService,
  ) {}

  ngOnInit(): void {
    this.esLiderProceso =
        this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso';
    // this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.crearFormulario();
    this.cargarCatalogos();
    this.verificarEstadoComponente();

    this.inicializarArbol();
    this.cargarNombreColumnas();
    this.estadoObservacion = this.servicioPlan.getData();
  }

  private cargarNombreColumnas() {
    if (this.esLiderProceso) {
      this.columnas = [
        {
          nombreCelda: 'nombreCreador',
          nombreCeldaHeader: 'Nombre del creador',
        },
        { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Descripción' },
        {
          nombreCelda: 'fecha',
          nombreCeldaHeader: 'Fecha',
          tipo: TipoColumna.FECHA,
        },
        { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
      ];
    } else {
      this.columnas = [
        {
          nombreCelda: 'nombreCreador',
          nombreCeldaHeader: 'Nombre del creador',
        },
        { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Descripción' },
        {
          nombreCelda: 'fecha',
          nombreCeldaHeader: 'Fecha',
          tipo: TipoColumna.FECHA,
        },
        { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
        {
          nombreCelda: 'acciones',
          nombreCeldaHeader: 'Acciones',
          tipo: TipoColumna.ACCIONES,
        },
      ];
    }
  }

  private cargarCatalogos(): void {
    this.procesoService.getProcesos().subscribe((res) => {
      this.procesos = res.procesos;
      this.formularioPlan.get('proceso').setValue(this.procesos[0]);
    });
  }

  private verificarEstadoComponente() {
    this.mostrarBtnVolver = false;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.codeUrl = params.get('id');
      if (this.codeUrl) {
        this.isDisabled = false;
        this.modoEdicionActivo = true;
        this.modoVer();
      }
    });
  }

  crearFormulario(): void {
    this.formularioPlan = this.formBuilder.group({
      codeURL: [null],
      createAt: [null],
      estado: [null],
      fechaFin: [null],
      fechaInicio: [null],
      fechaSuscripcion: [null],
      idPlanMejoramiento: [{ value: null, disabled: true }],
      listaHallazgos: [null],
      nombre: [null, Validators.required],
      objLiderProceso: [null, Validators.required],
      objLiderAuditor: [null, Validators.required],
      pathSoporte: [null],
      proceso: [null],
      prorrogado: [false],
    });
  }
  get nombre() {
    return this.formularioPlan.get('nombre');
  }

  modoVer() {
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioPlan.disable();
      this.mostrarBtnVolver = true;
      if(this.servicioPlan.getData()){
        this.titulo = 'Ver un plan de mejora';
        console.log(this.estadoObservacion)
      }else {
        this.titulo = 'Observaciones';
        console.log(this.estadoObservacion)
      }
    }
    this.servicioPlan
        .getPlanConsultar(this.codeUrl)
        .pipe(debounceTime(12000))
        .subscribe((res: any) => {
          this.objPlan = res.planMejoramiento;

          const arrayPropiedadesObjetoPlan = Object.getOwnPropertyNames(
              this.formularioPlan.getRawValue()
          );
          arrayPropiedadesObjetoPlan.forEach((element) => {
            if (element === 'objLiderProceso' || element === 'objLiderAuditor') {
              this.formularioPlan
                  .get(element)
                  .setValue([res.planMejoramiento[element].id]);
            } else {
              this.formularioPlan
                  .get(element)
                  .setValue(res.planMejoramiento[element]);
            }
          });
          this.formularioPlan
              .get('proceso')
              .setValue(
                  this.procesos.filter(
                      (proceso) =>
                          res.planMejoramiento.proceso.idProceso === proceso.idProceso
                  )[0]
              );
          this.formularioPlan
              .get('fechaInicio')
              .setValue(
                  cambiarTextoAFecha(this.formularioPlan.get('fechaInicio').value)
              );
          this.formularioPlan
              .get('fechaFin')
              .setValue(
                  cambiarTextoAFecha(this.formularioPlan.get('fechaFin').value)
              );
          if (this.formularioPlan.get('fechaSuscripcion').value) {
            this.formularioPlan
                .get('fechaSuscripcion')
                .setValue(
                    cambiarTextoAFecha(
                        this.formularioPlan.get('fechaSuscripcion').value
                    )
                );
          }
        });
    //SE FILTRAN LOS RESULTADOS DE LAS OBSERVACIONES
    //1=PLAN_MEJORA
    //2=HALLAZGOS
    //3=CAUSAS
    //4=ACCIONES
    //5=ACTIVIDADES
    if (this.servicioPlan.getTipoPlan()==1){
      this.observacionesService.getObservacionPorIdPlan(this.codeUrl).subscribe(
        (res) => {
          this.observacion = res;
          const listadoObservaciones_planMejora = res.map((obj) => ({
            identificadorObservacion: obj.id_observacion,
            nombreCreador: obj.objPerson.names + ' ' + obj.objPerson.surnames,
            nombrePlan: obj.descripcion,
            fecha: obj.fecha_registro,
            estado: obj.estado,
            tipo_plan_mejora: obj.tipo_plan_mejora
          })).filter((obj) => obj.tipo_plan_mejora === '1');
          this.streamDatos$.next(listadoObservaciones_planMejora);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
    if (this.servicioPlan.getTipoPlan()==2){
      this.observacionesService.getObservacionPorIdPlan(this.codeUrl).subscribe(
        (res) => {
          this.observacion = res;
          const listadoObservaciones_planMejora = res.map((obj) => ({
            identificadorObservacion: obj.id_observacion,
            nombreCreador: obj.objPerson.names + ' ' + obj.objPerson.surnames,
            nombrePlan: obj.descripcion,
            fecha: obj.fecha_registro,
            estado: obj.estado,
            tipo_plan_mejora: obj.tipo_plan_mejora
          })).filter((obj) => obj.tipo_plan_mejora === '2');
          this.streamDatos$.next(listadoObservaciones_planMejora);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
    if (this.servicioPlan.getTipoPlan()==3){
      this.observacionesService.getObservacionPorIdPlan(this.codeUrl).subscribe(
        (res) => {
          this.observacion = res;
          const listadoObservaciones_planMejora = res.map((obj) => ({
            identificadorObservacion: obj.id_observacion,
            nombreCreador: obj.objPerson.names + ' ' + obj.objPerson.surnames,
            nombrePlan: obj.descripcion,
            fecha: obj.fecha_registro,
            estado: obj.estado,
            tipo_plan_mejora: obj.tipo_plan_mejora
          })).filter((obj) => obj.tipo_plan_mejora === '3');
          this.streamDatos$.next(listadoObservaciones_planMejora);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
    if (this.servicioPlan.getTipoPlan()==4){
      this.observacionesService.getObservacionPorIdPlan(this.codeUrl).subscribe(
        (res) => {
          this.observacion = res;
          const listadoObservaciones_planMejora = res.map((obj) => ({
            identificadorObservacion: obj.id_observacion,
            nombreCreador: obj.objPerson.names + ' ' + obj.objPerson.surnames,
            nombrePlan: obj.descripcion,
            fecha: obj.fecha_registro,
            estado: obj.estado,
            tipo_plan_mejora: obj.tipo_plan_mejora
          })).filter((obj) => obj.tipo_plan_mejora === '4');
          this.streamDatos$.next(listadoObservaciones_planMejora);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
    if (this.servicioPlan.getTipoPlan()==5){
      this.observacionesService.getObservacionPorIdPlan(this.codeUrl).subscribe(
        (res) => {
          this.observacion = res;
          const listadoObservaciones_planMejora = res.map((obj) => ({
            identificadorObservacion: obj.id_observacion,
            nombreCreador: obj.objPerson.names + ' ' + obj.objPerson.surnames,
            nombrePlan: obj.descripcion,
            fecha: obj.fecha_registro,
            estado: obj.estado,
            tipo_plan_mejora: obj.tipo_plan_mejora
          })).filter((obj) => obj.tipo_plan_mejora === '5');
          this.streamDatos$.next(listadoObservaciones_planMejora);
        },
        () => {
          this.streamDatos$.next([]);
        }
      );
    }
  }

  listar() {
    if(this.servicioPlan.getTipoPlan()==1){
      this.router.navigate(['/home/planes-mejora/historial/planes']);
    }
    if(this.servicioPlan.getTipoPlan()==2){
      //this.router.navigate(['/home/planes-mejora/historial/hallazgos']);
      //this.estadosComunService.changeHallazgo(hallazgoAAgregarCausa[0]);
      this.router.navigate(['/home/planes-mejora/historial/hallazgos']);
      this.estadosComunService.changeSelectedIndex(1);
    }
    if(this.servicioPlan.getTipoPlan()==3){
      this.router.navigate(['/home/planes-mejora/historial/causas']);
      this.estadosComunService.changeSelectedIndex(2);
    }
    if(this.servicioPlan.getTipoPlan()==4){
      this.router.navigate(['/home/planes-mejora/historial/acciones']);
      this.estadosComunService.changeSelectedIndex(3);
    }
    if(this.servicioPlan.getTipoPlan()==5){
      this.router.navigate(['/home/planes-mejora/historial/actividades']);
      this.estadosComunService.changeSelectedIndex(4);
    }

  }
  editarDatos() {
    this.router.navigate([
      '/home/planes-mejora/historial/planes/agregar',
      this.objPlan.codeURL,
    ]);
    localStorage.setItem('visualizar', 'false');
    this.estadosComunService.changeSelectedIndex(0);
  }

  abrir() {
    const data = {
      codeUrl: this.codeUrl,
      crear: true,
      plan: this.objPlan,
    };
    const dialogRef = this.dialog.open(ObservacionesComponent, {
      disableClose: false,
      width: '90%',
      data: { data },
    });
    console.log(data)
    dialogRef.afterClosed().subscribe((x) => this.modoVer());
  }

  editarObservacion(observacionSeleccionado) {
    const observacionAEditar: Observacion[] = this.observacion.filter(
        (observacion) =>
            observacion.id_observacion ===
            observacionSeleccionado.identificadorObservacion
    );
    const data = {
      codeUrl: this.codeUrl,
      crear: false,
      plan: this.objPlan,
      observacion: observacionAEditar[0],
    };
    const dialogRef = this.dialog.open(ObservacionesComponent, {
      disableClose: false,
      width: '90%',
      data: { data },
    });
    dialogRef.afterClosed().subscribe((x) => this.modoVer());
  }

  eliminarObservacion(observacionSeleccionado) {
    Swal.fire({
      title: '¿Deseas eliminar la observación?',
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.observacionesService
            .eliminarObservacion(observacionSeleccionado.identificadorObservacion)
            .subscribe(() => {
              this.modoVer();
              Swal.fire('Se elimino con exito la observación', '', 'success');
            });
      }
    });
  }
  asignarNombreObservacion() {
    if(this.servicioPlan.getTipoPlan()==1){
      return this.nombreTipo= "Observaciones Planes Mejora";
    }
    if(this.servicioPlan.getTipoPlan()==2){
      return this.nombreTipo= "Observaciones Hallazgos";
    }
    if(this.servicioPlan.getTipoPlan()==3){
      return this.nombreTipo= "Observaciones Causas";
    }
    if(this.servicioPlan.getTipoPlan()==4){
      return this.nombreTipo= "Observaciones Acciones";
    }
    if(this.servicioPlan.getTipoPlan()==5){
      return this.nombreTipo= "Observaciones Actividades";
    }
  }

  //*******************************Métodos para árbol***************************** */

  //*Inicializar árbol
  inicializarArbol() {
    this.treeFlattener = new MatTreeFlattener(
        this.transformer,
        this.getLevel,
        this.isExpandable,
        this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
        this.getLevel,
        this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
        this.treeControl,
        this.treeFlattener
    );
    this._database.setCode(this.codeUrl);
    this._database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      this.noHayDatosParaMostrar = data.length === 0;
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
      _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
        existingNode && existingNode.item === node.item
            ? existingNode
            : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
        descendants.length > 0 &&
        descendants.every((child) => {
          return this.checklistSelection.isSelected(child);
        });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
        this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
        descendants.length > 0 &&
        descendants.every((child) => {
          return this.checklistSelection.isSelected(child);
        });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  public siEsNumerico(variable) {
    return parseInt(variable) + 1;
  }

  public siEsNumericoBoolean(variable) {
    return this.siEsNumerico(variable.item).toString() !== 'NaN';
  }

  public escribirNombreNodo(nodo) {
    if (nodo.level == 0) {
      return 'Hallazgo';
    }
    if (nodo.level == 2) {
      return 'Causa';
    }
    if (nodo.level == 4) {
      return 'Acción';
    }
    if (nodo.level == 6) {
      return 'Acción';
    }
    if (nodo.level == 8) {
      return 'Actividad';
    }
  }

  protected readonly console = console;
}
