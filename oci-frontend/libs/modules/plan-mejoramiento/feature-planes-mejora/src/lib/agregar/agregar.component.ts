import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { estadosPlan, Person, UserService } from '@unicauca/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  cambiarTextoAFecha,
  plan,
  PlanService,
  Proceso,
  ProcesoService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import Swal from 'sweetalert2';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';
import { Columna, TipoColumna } from '@unicauca/shared/components/tabla';
import { AuthService } from '@unicauca/auth';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'unicauca-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  date = new FormControl(new Date());
  formularioPlan: FormGroup;

  modoEdicionActivo: boolean;
  public objPlan: plan = new plan();
  public errores: string[];
  public fechaActual: Date = new Date();
  public fechaMaxima: Date = new Date();
  public idPlanMejora = '';
  public codeUrl: string;
  isDisabled = true;
  public validadorCheckAuditor = true;
  public validadorCheckLiderProceso = true;
  public tituloBoton = '';

  tituloCargarArchivos = 'Seleccione un archivo';
  // nombreArchivo = 'documento de inicio o soporte del plan';

  public auditores: Person[] = [];
  public lideresProceso: Person[] = [];

  public procesos: Proceso[];
  mostrarBtnVolver: boolean;
  titulo: string;

  esAuditor = false;
  esLiderProceso = false;
  esAdministrado = false;

  public listadoEstado = estadosPlan;
  unsubscribe$ = new Subject();

  selectionLiderProceso = new SelectionModel<any>(true, []);
  selectionLiderAudior = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'nombre', 'cargo'];
  dataSourceLiderProceso: MatTableDataSource<any> = new MatTableDataSource<any>(
      []
  );
  dataSourceLiderAuditor: MatTableDataSource<any> = new MatTableDataSource<any>(
      []
  );

  /**Array de titulos de columnas */
  columnas: Columna[] = [
    {
      nombreCelda: 'opciones',
      nombreCeldaHeader: 'Opciones',
      tipo: TipoColumna.SELECT,
    },
    { nombreCelda: 'nombre', nombreCeldaHeader: 'Nombre' },
    { nombreCelda: 'cargo', nombreCeldaHeader: 'Cargo' },
  ];

  streamDatosAuditor$ = new BehaviorSubject<any[]>([]);
  streamDatosLiderProceso$ = new BehaviorSubject<any[]>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginatorAuditor: MatPaginator;

  constructor(
      private router: Router,
      private service: PlanService,
      private userService: UserService,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private servicioPlan: PlanService,
      private procesoService: ProcesoService,
      private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.esAuditor =
        this.authService.getUsuario().objRole[0] === 'ROLE_auditor';
    this.esLiderProceso =
        this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso';
    this.esAdministrado =
        this.authService.getUsuario().objRole[0] === 'ROLE_administrador';
    if (this.esLiderProceso) {
      this.validadorCheckAuditor = false;
      this.validadorCheckLiderProceso = false;
    }
    this.crearFormulario();
    this.validarAnoYMedioAPartirFechaActual();
    this.cargarCatalogos();
    this.verificarEstadoComponente();
    this.colocarIneditablesCampos();
  }

  private cargarCatalogos(): void {
    this.userService
        .getUsuariosPorRol('ROLE_auditor')
        .pipe(
            takeUntil(this.unsubscribe$),
            tap((res: any[]) =>
                res.forEach((element) => {
                  this.auditores.push(element.objPerson);
                })
            ),
            map((listadoLiderAuditor: any[]) =>
                listadoLiderAuditor.map((persona) => ({
                  id: persona.objPerson.id,
                  nombre: persona.objPerson.names + ' ' + persona.objPerson.surnames,
                  cargo: persona.objPerson.objPosition.positioName,
                }))
            )
        )
        .subscribe((res) => {
          this.dataSourceLiderAuditor = new MatTableDataSource<any>(res);
          this.streamDatosAuditor$.next(res);
          if (this.modoEdicionActivo) {
            const objSeleccionadoLiderAuditor = this.dataSourceLiderAuditor.data.find(
                (item) => item.id == this.objLiderAuditor.value[0]
            );
            this.selectionLiderAudior.clear();
            this.selectionLiderAudior.select(objSeleccionadoLiderAuditor);
            this.streamDatosAuditor$.next(this.dataSourceLiderAuditor.data);
            this.dataSourceLiderAuditor = new MatTableDataSource<any>(
                this.dataSourceLiderAuditor.data
            );
          }
          this.dataSourceLiderAuditor.paginator = this.paginatorAuditor;
        });
    this.userService
        .getUsuariosPorRol('ROLE_liderDeProceso')
        .pipe(
            takeUntil(this.unsubscribe$),
            tap((res: any[]) =>
                res.forEach((element) => {
                  this.lideresProceso.push(element.objPerson);
                })
            ),
            map((listadoLiderProceso: any[]) =>
                listadoLiderProceso.map((persona) => ({
                  id: persona.objPerson.id,
                  nombre: persona.objPerson.names + ' ' + persona.objPerson.surnames,
                  cargo: persona.objPerson.objPosition.positioName,
                }))
            )
        )
        .subscribe((res) => {
          this.dataSourceLiderProceso = new MatTableDataSource<any>(res);
          this.streamDatosLiderProceso$.next(res);

          if (this.modoEdicionActivo) {
            const objSeleccionadoLiderProceso = this.dataSourceLiderProceso.data.find(
                (item) => item.id == this.objLiderProceso.value[0]
            );
            this.selectionLiderProceso.clear();
            this.selectionLiderProceso.select(objSeleccionadoLiderProceso);
            this.streamDatosLiderProceso$.next(this.dataSourceLiderProceso.data);
            this.dataSourceLiderProceso = new MatTableDataSource<any>(
                this.dataSourceLiderProceso.data
            );
          }
          this.dataSourceLiderProceso.paginator = this.paginator;
        });
    this.procesoService.getProcesos().subscribe((res) => {
      this.procesos = res.procesos;
      this.formularioPlan.get('proceso').setValue(this.procesos[0]);
    });
  }

  private colocarIneditablesCampos() {
    if (this.esAuditor) {
      this.formularioPlan.get('nombre').disable();
      this.formularioPlan.get('fechaInicio').disable();
      this.formularioPlan.get('fechaFin').disable();
      this.formularioPlan.get('proceso').disable();
      this.formularioPlan.get('prorrogado').disable();
    }
    if (this.esLiderProceso) {
      this.formularioPlan.get('estado').disable();
      this.formularioPlan.get('fechaSuscripcion').disable();
    }
  }

  private verificarEstadoComponente() {
    this.mostrarBtnVolver = false;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.codeUrl = params.get('id');
      if (this.codeUrl) {
        this.isDisabled = false;
        this.tituloBoton = 'Guardar';
        this.titulo = 'Editar plan de mejora';
        this.modoEdicionActivo = true;
        this.modoEdicion();
      } else {
        this.isDisabled = true;
        this.modoEdicionActivo = false;
        this.tituloBoton = 'Guardar';
        this.titulo = 'Nuevo plan de mejora';
        this.modoCreacion();
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
      idPlanMejoramiento: [null],
      listaHallazgos: [null],
      nombre: [null, Validators.required],
      objLiderProceso: [[]],
      objLiderAuditor: [[]],
      pathSoporte: [null],
      proceso: [null],
      prorrogado: [false],
    });
  }

  get objLiderProceso() {
    return this.formularioPlan.get('objLiderProceso');
  }
  get objLiderAuditor() {
    return this.formularioPlan.get('objLiderAuditor');
  }

  onDesicionCreacionOEditar() {
    if (!this.modoEdicionActivo) {
      this.guardar();
    } else {
      this.editar();
    }
  }
  editar() {
    if (
        this.formularioPlan.invalid ||
        this.validadorCheckAuditor ||
        this.validadorCheckLiderProceso
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Debes ingresar todos los datos requeridos!',
      });
      return;
    }
    if (!this.esLiderProceso) {
      this.recuperarPersonasLideres();
      this.objPlan = this.formularioPlan.getRawValue();
      this.objPlan.objLiderAuditor = this.objPlan.objLiderAuditor[0];
      this.objPlan.objLiderProceso = this.objPlan.objLiderProceso[0];
    } else {
      this.objPlan = this.formularioPlan.getRawValue();
    }

    // this.recuperarPersonasLideres();
    // this.objPlan = this.formularioPlan.getRawValue();
    // this.objPlan.objLiderAuditor = this.objPlan.objLiderAuditor[0];
    // this.objPlan.objLiderProceso = this.objPlan.objLiderProceso[0];
    this.service.updatePlan(this.objPlan).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Plan de mejoramiento editado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      this.listar();
    });
  }

  modoCreacion() {
    this.formularioPlan.get('fechaInicio').setValue(new Date());
    this.formularioPlan.get('fechaFin').setValue(new Date());
    // this.service.getIdPlanMejoramiento().subscribe((res) => {
    //   this.formularioPlan.get('idPlanMejoramiento').setValue(res[0]);
    //   this.idPlanMejora = res[0];
    // });
  }

  modoEdicion() {
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioPlan.disable();
      this.mostrarBtnVolver = true;
      this.titulo = 'Ver un plan de mejora';
    }
    this.servicioPlan
        .getPlanConsultar(this.codeUrl)
        .pipe(debounceTime(15000))
        .subscribe((res: any) => {
          const arrayPropiedadesObjetoPlan = Object.getOwnPropertyNames(
              this.formularioPlan.getRawValue()
          );
          // const fechaI = new Date(this.formularioPlan.get('fechaInicio').value);

          arrayPropiedadesObjetoPlan.forEach((element) => {
            if (element === 'objLiderProceso' || element === 'objLiderAuditor') {
              if (res.planMejoramiento[element] !== null) {
                this.formularioPlan
                    .get(element)
                    .setValue([res.planMejoramiento[element].id]);
              }
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
          this.fechaActual = this.formularioPlan.get('fechaInicio').value;
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

          const objSeleccionadoAuditor = this.dataSourceLiderAuditor.data.find(
              (item) => item.id == this.objLiderAuditor.value[0]
          );
          this.selectionLiderAudior.clear();
          this.selectionLiderAudior.select(objSeleccionadoAuditor);
          this.validadorCheckAuditor = false;
          this.streamDatosAuditor$.next(this.dataSourceLiderAuditor.data);
          this.dataSourceLiderAuditor = new MatTableDataSource<any>(
              this.dataSourceLiderAuditor.data
          );
          this.dataSourceLiderAuditor.paginator = this.paginatorAuditor;

          const objSeleccionadoLiderProceso = this.dataSourceLiderProceso.data.find(
              (item) => item.id == this.objLiderProceso.value[0]
          );
          this.selectionLiderProceso.clear();
          this.selectionLiderProceso.select(objSeleccionadoLiderProceso);
          this.validadorCheckLiderProceso = false;
          this.streamDatosLiderProceso$.next(this.dataSourceLiderProceso.data);
          this.dataSourceLiderProceso = new MatTableDataSource<any>(
              this.dataSourceLiderProceso.data
          );
          this.dataSourceLiderProceso.paginator = this.paginator;
        });
  }

  listar() {
    this.router.navigate(['/home/planes-mejora/historial/planes']);
  }

  guardar() {
    if (
        this.formularioPlan.invalid ||
        this.validadorCheckAuditor ||
        this.validadorCheckLiderProceso
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar todos los datos requeridos!',
      });
    } else {
      if (!this.esLiderProceso) {
        this.recuperarPersonasLideres();
        this.objPlan = this.formularioPlan.getRawValue();
        this.objPlan.objLiderAuditor = this.objPlan.objLiderAuditor[0];
        this.objPlan.objLiderProceso = this.objPlan.objLiderProceso[0];
      } else {
        this.objPlan = this.formularioPlan.getRawValue();
        this.objPlan.objLiderProceso = this.authService.getUsuario();
        this.objPlan.objLiderAuditor = null;
      }

      this.service.createPlan(this.objPlan).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de mejoramiento creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listar();
      });
    }
  }

  public formatDate(date: Date): string {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  recibirAuditor(event) {
    this.objPlan.objLiderAuditor = event;
  }

  recibirLiderProceso(event) {
    this.objPlan.objLiderProceso = event;
  }

  validarAnoYMedioAPartirFechaActual() {
    const vari: Date = new Date();
    vari.setMonth(this.fechaActual.getMonth() + 18);
    this.fechaMaxima = vari;
  }

  verificarFechas(event) {
    if (this.validarFechaInicioMayorFechaFin(event, this.objPlan.fechaFin)) {
      this.objPlan.fechaFin = event;
    }
  }

  validarFechaInicioMayorFechaFin(date1, date2) {
    const fecha1 = date1 ? new Date(date1).getTime() : null;
    const fecha2 = date2 ? new Date(date2).getTime() : null;
    return fecha1 && fecha2 ? fecha1 > fecha2 : false;
  }

  // onFileComplete(data: any) {
  //   this.nombreArchivo = data.name;
  // }

  onAplicarFiltroItemsLiderProceso(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLiderProceso.filter = filterValue.trim().toLowerCase();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onSeleccionarUnicaFilaLiderProceso(row?) {
    if (this.selectionLiderProceso.selected[0] === row) {
      this.selectionLiderProceso.clear();
      this.validadorCheckLiderProceso = true;
    } else {
      this.selectionLiderProceso.clear();
      this.selectionLiderProceso.select(row);
      this.validadorCheckLiderProceso = false;
    }
  }
  onAplicarFiltroItemsLiderAuditor(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLiderAuditor.filter = filterValue.trim().toLowerCase();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onSeleccionarUnicaFilaLiderAuditor(row?) {
    if (this.selectionLiderAudior.selected[0] === row) {
      this.selectionLiderAudior.clear();
      this.validadorCheckAuditor = true;
    } else {
      this.selectionLiderAudior.clear();
      this.selectionLiderAudior.select(row);
      this.validadorCheckAuditor = false;
    }
  }

  recuperarPersonasLideres() {
    debugger;
    const liderProceso: Person[] = this.lideresProceso.filter(
        (liderProcceso) =>
            this.selectionLiderProceso.selected[0].id === liderProcceso.id
    );
    this.objLiderProceso.setValue(
        liderProceso,
        this.selectionLiderAudior.selected[0]
    );
    const liderAuditor: Person[] = this.auditores.filter(
        (liderAuditor) =>
            this.selectionLiderAudior.selected[0].id === liderAuditor.id
    );
    this.objLiderAuditor.setValue(liderAuditor);
  }
}
