import { Columna } from '@unicauca/shared/components/tabla';
import {
  EstadoButtons,
  TipoColumna,
} from './../../../../../../shared/components/tabla/src/lib/model/tabla.model';
import { HallazgoService } from './../../../../../hallazgos/data-access/src/lib/service/hallazgo.service';
import { CausaService } from './../../../../../causas/data-access/src/lib/service/causa.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges, ElementRef,
} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccionesService } from '@unicauca/modules/acciones/data-access';
import {
  Accion,
  Actividad,
  cambiarTextoAFecha,
  Causa,
  TipoControl,
  TipoControlService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, switchMap, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  estadosPeriodicidad,
  estadosRecursos,
  EstadoCheck,
  Person,
  UserService,
} from '@unicauca/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';
import { AuthService } from 'libs/auth/src/lib/data-access/auth/auth.service';

@Component({
  selector: 'unicauca-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.scss'],
})
export class GestionActividadesComponent implements OnInit {
  formularioActividad: FormGroup;
  titulo = '';
  nombreBoton = '';
  idAccion: number;
  idActividad: number;
  accion: Accion;
  actividad = Actividad;
  tipoControl: TipoControl[] = [];
  fechaInicio = null;
  fechaFinal = null;
  fechaActual = new Date();

  mostrarBtnVolver = false;
  desactivarCheck = false;
  modoEdicionActivo = false;
  esAuditor = false;
  esLiderProceso = false;

  contador = 0;

  unsubscribe$ = new Subject();
  streamDatosAuditor$ = new BehaviorSubject<any[]>([]);

  activarFiltroItems = true;
  estadoButtons: EstadoButtons = {
    crear: false,
    editar: false,
    eliminar: false,
    upload: false,
    visualizar: false,
    seleccionar: true,
  };

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
  streamDatos$ = new BehaviorSubject<any[]>([]);

  selection = new SelectionModel<any>(true, []);

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  public listadoPeriocidad = estadosPeriodicidad;
  public listadoRecursos = estadosRecursos;
  tipoUnidad;

  public validadorCheckAuditor = true;
  public responsables: Person[] = [];

  public listaCheck: EstadoCheck[] = [
    { id: 1, descripcion: 'Número', value: 'N', checked: false },
    { id: 2, descripcion: 'Porcentaje', value: 'P', checked: false },
  ];

  displayedColumns: string[] = ['select', 'nombre', 'cargo'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private accionesService: AccionesService,
    private actividadesService: ActividadesService,
  ) {}

  ngOnInit(): void {
    this.esAuditor =
      this.authService.getUsuario().objRole[0] === 'ROLE_auditor';
    this.esLiderProceso =
      this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso';
    this.crearFormulario();
    // this.tipoControlService.getTipoControl().subscribe((tipoControl: any) => {
    //   this.tipoControl = tipoControl.tipoControl;
    //   this.recurso.setValue(this.tipoControl[0].idTipoControl);
    // });
    this.cargarDatosResponsable();
    this.verificarEstadoComponente();
    this.colocarIneditablesCampos();
    this.tipoUnidad = true;
    //console.log(this.formularioActividad.get('tipo_unidad').value)
  }
  onRadioChange(event: string) {
    //console.log(this.formularioActividad.get('tipo_unidad').value)
    this.tipoUnidad = true
    if (event == 'N'){
      this.formularioActividad.get('valor_unidad').setValue(1);
      this.tipoUnidad = true
    }else{
      this.formularioActividad.get('valor_unidad').setValue(100);
      this.tipoUnidad = false
    }
  }
  private cargarDatosResponsable(): void {
    this.userService
      .getUsuariosPorRol('ROLE_responsable')
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((res: any[]) =>
          res.forEach((element) => {
            this.responsables.push(element.objPerson);
          })
        ),
        map((listadoResponsables: any[]) =>
          listadoResponsables.map((persona) => ({
            id: persona.objPerson.id,
            nombre: persona.objPerson.names + ' ' + persona.objPerson.surnames,
            cargo: persona.objPerson.objPosition.positioName,
          }))
        )
      )
      .subscribe((datosResponsable) => {
        this.dataSource = new MatTableDataSource<any>(datosResponsable);
        this.streamDatosAuditor$.next(datosResponsable);
        this.dataSource.paginator = this.paginator;
      });
  }

  verificarEstadoComponente() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((respuestaURL) => {
          this.idAccion = parseInt(respuestaURL.get('idAccion'));
          this.idActividad = parseInt(respuestaURL.get('idActividad'));
          return this.accionesService.getAccionPorId(this.idAccion);
        })
      )
      .subscribe((objAccion: any) => {
        this.accion = objAccion.accion;
        this.fechaInicio = cambiarTextoAFecha(
          this.accion.objCausa.objHallazgo.objPlan.fechaInicio
        );
        this.fechaFinal = cambiarTextoAFecha(
          this.accion.objCausa.objHallazgo.objPlan.fechaFin
        );
        this.streamDatosAuditor$.next(this.dataSource.data);
        if (this.idActividad) {
          this.modeEdicion();
          this.modoEdicionActivo = true;
        } else {
          this.modoCreacion();
          this.modoEdicionActivo = false;
        }
      });
  }

  private colocarIneditablesCampos() {
    if (this.esAuditor) {
      this.formularioActividad.get('indicador').disable();
      this.formularioActividad.get('tipo_unidad').disable();
      this.formularioActividad.get('valor_unidad').disable();
      this.formularioActividad.get('recurso').disable();
      this.formularioActividad.get('periodicidad').disable();
      this.formularioActividad.get('estado').disable();
      this.formularioActividad.get('fechaEjecucion').disable();
      this.formularioActividad.get('fechaTerminacion').disable();
      this.formularioActividad.get('descripcionActividad').disable();
      this.formularioActividad.get('tipoEvidencia').disable();
      this.desactivarCheck = true;
    }
    if (this.esLiderProceso) {
      this.formularioActividad.get('fechaSeguimiento').disable();
    }
  }

  private crearFormulario(): void {
    this.formularioActividad = this.formBuilder.group({
      id_Actividad: [null],
      indicador: [null, Validators.required],
      tipo_unidad: [this.listaCheck[0].value, Validators.required],
      valor_unidad: [1, Validators.required],
      recurso: [this.listadoRecursos[1].descripcion, Validators.required],
      periodicidad: [
        this.listadoPeriocidad[0].descripcion,
        Validators.required,
      ],
      estado: [null],
      fechaEjecucion: [null, Validators.required],
      fechaSeguimiento: [null],
      fechaTerminacion: [null],
      descripcionActividad: [null, Validators.required],
      tipoEvidencia:[null, Validators.required],
      objAccion: [null],
      objResponsable: [null],
      avance: [null],
      cumplimiento: [null],
    });
  }

  private modoCreacion(): void {
    this.titulo = 'Formular actividad';
    this.nombreBoton = 'Guardar';
  }
  private modeEdicion(): void {
    //Para obtener el valor del campo Unidad
    this.actividadesService.getActividadPorId(this.idActividad).subscribe(
      (data:any) => {
        // Dentro de esta función, data contendrá los valores emitidos por el Observable.
        if(data.actividad.tipo_unidad === 'P'){
          this.tipoUnidad = false
        }
        if(data.actividad.tipo_unidad === 'N'){
          this.tipoUnidad = true;
        }
      },
      (error) => {
        // En caso de error.
        console.error(error);
      });
    this.titulo = 'Editar actividad';
    this.nombreBoton = 'Editar';
    this.actividadesService
      .getActividadPorId(this.idActividad)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack: any) => {
        this.actividad = respuestaBack.actividad;
        const cadena: string = respuestaBack.actividad.descripcionActividad;
        this.contador = cadena ? cadena.length : 0;
        this.formularioActividad.setValue(respuestaBack.actividad);
        this.formularioActividad
          .get('fechaEjecucion')
          .setValue(
            cambiarTextoAFecha(
              this.formularioActividad.get('fechaEjecucion').value
            )
          );
        if (respuestaBack.actividad.fechaSeguimiento) {
          this.formularioActividad
            .get('fechaSeguimiento')
            .setValue(
              cambiarTextoAFecha(respuestaBack.actividad.fechaSeguimiento)
            );
        }
        if (respuestaBack.actividad.fechaTerminacion) {
          this.formularioActividad
            .get('fechaTerminacion')
            .setValue(
              cambiarTextoAFecha(respuestaBack.actividad.fechaTerminacion)
            );
        }
        this.fechaActual = this.formularioActividad.get('fechaEjecucion').value;
        const objSeleccionado = this.dataSource.data.find(
          (item) => item.id === this.objResponsable.value.id
        );
        this.selection.select(objSeleccionado);
        this.validadorCheckAuditor = false;
        this.streamDatosAuditor$.next(this.dataSource.data);
        this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
      });
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioActividad.disable();
      this.desactivarCheck = true;
      this.mostrarBtnVolver = true;
      this.titulo = 'Ver actividad';
    }
  }

  public onDesicionCreacionOEditar(): void {
    this.modoEdicionActivo ? this.onEditar() : this.onGuardar();
  }
  public onEditar(): void {
    if (this.formularioActividad.invalid || this.validadorCheckAuditor) {
      return;
    }
    // this.recurso.setValue(
    //   this.tipoControl.filter(
    //     (tipo) => tipo.idTipoControl === this.recurso.value
    //   )[0]
    // );
    const respon: Person[] = this.responsables.filter(
      (responsable) => this.selection.selected[0].id === responsable.id
    );

    this.objResponsable.setValue(respon[0]);

    this.actividadesService
      .editarActividad(this.formularioActividad.getRawValue(), this.idActividad)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${respuestaBack.mensaje}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.volver();
      });
  }
  public onGuardar(): void {
    console.log(this.formularioActividad.value)
    console.log(this.formularioActividad.get('tipo_unidad').value)
    if (this.formularioActividad.invalid || this.validadorCheckAuditor) {
      return;
    }
    // this.recurso.setValue(
    //   this.tipoControl.filter(
    //     (tipo) => tipo.idTipoControl === this.recurso.value
    //   )[0]
    // );

    this.objAccion.setValue(this.accion);
    const respon: Person[] = this.responsables.filter(
      (responsable) => this.selection.selected[0].id === responsable.id
    );

    this.objResponsable.setValue(respon[0]);

    this.actividadesService
      .crearActividad(this.formularioActividad.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${respuestaBack.mensaje}`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.volver();
      });
  }
  public listar(): void {
    this.volver();
  }
  public volver(): void {
    this.router.navigate(['/home/planes-mejora/historial/actividades']);
  }

  get id_Actividad() {
    return this.formularioActividad.get('id_Actividad');
  }
  get indicador() {
    return this.formularioActividad.get('indicador');
  }
  get tipo_unidad() {
    return this.formularioActividad.get('tipo_unidad');
  }
  get valor_unidad() {
    return this.formularioActividad.get('valor_unidad');
  }
  get periodicidad() {
    return this.formularioActividad.get('periodicidad');
  }
  get estado() {
    return this.formularioActividad.get('estado');
  }
  get fecha_max_entrega() {
    return this.formularioActividad.get('fecha_max_entrega');
  }
  get objAccion() {
    return this.formularioActividad.get('objAccion');
  }
  get objResponsable() {
    return this.formularioActividad.get('objResponsable');
  }
  get recurso() {
    return this.formularioActividad.get('recurso');
  }

  onKey(event) {
    this.contador = event.target.value.length;
  }
  onAplicarFiltroItems(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onSeleccionarUnicaFila(row?) {
    this.selection.clear();
    this.selection.select(row);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  onSeleccionarUnicaFilaLiderAuditor(row?) {
    if (this.selection.selected[0] === row) {
      this.selection.clear();
      this.validadorCheckAuditor = true;
    } else {
      this.selection.clear();
      this.selection.select(row);
      this.validadorCheckAuditor = false;
    }
  }

  protected readonly event = event;
}
