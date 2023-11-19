import {map, takeUntil} from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
// Angular
import {ActivatedRoute, Router} from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Terceros
import Swal from 'sweetalert2';

// Libs
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Observacion, ObservacionesService,
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from '@unicauca/auth';
import { Columna, EstadoButtons, TipoColumna } from '@unicauca/shared/components/tabla';
import { EstadosComunService } from '@unicauca/core';
import {ObservacionesComponent} from "../observaciones/observaciones.component";
import {MatDialog} from "@angular/material/dialog";
import {list} from "@nrwl/workspace/src/command-line/list";


@Component({
  selector: 'unicauca-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  @Output() evPlan = new EventEmitter<plan>();
  @Output() evSelectedIndex = new EventEmitter<number>();

  titulo = '';
  activarFiltroItems = true;

  unsubscribe$ = new Subject();

  esAuditor = false;
  esLiderProceso = false;
  esAdministrado = false;
  idPersona: number;

  hintAgregarOVerAuditor = ''
  estadoButtons: EstadoButtons = {};

  /**Array de titulos de columnas */
  columnas: Columna[] = [
    { nombreCelda: 'identificadorPlan', nombreCeldaHeader: 'Identificador' },
    { nombreCelda: 'nombrePlan', nombreCeldaHeader: 'Nombre' },
    {
      nombreCelda: 'procesoResponsable',
      nombreCeldaHeader: 'Proceso responsable',
    },
    { nombreCelda: 'estado', nombreCeldaHeader: 'Estado' },
    {
      nombreCelda: 'acciones',
      nombreCeldaHeader: 'Acciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];

  streamDatos$ = new BehaviorSubject<any[]>([]);

  public planes: plan[];
  public idPlan: string;
  public objPlan: plan = new plan();
  public codeUrl: string;
  public estadoBotonSiguiente : boolean;
  private data : any[]=[];


  correo: string;
  rol: string;

  public plan: plan;

  constructor(
    private router: Router,
    private authService: AuthService,
    private servicioPlan: PlanService,
    private estadosComunService: EstadosComunService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
    this.esAuditor = (this.authService.getUsuario().objRole[0] === 'ROLE_auditor');
    this.esLiderProceso = (this.authService.getUsuario().objRole[0] === 'ROLE_liderDeProceso');
    this.esAdministrado = (this.authService.getUsuario().objRole[0] === 'ROLE_administrador');
    this.idPersona = this.authService.getUsuario().objPerson.id;
    this.hintAgregarOVerAuditor = (this.esAuditor ? 'Ver' : 'Agregar');
    this.listar();
    this.llenarBotones();
    this.estadosComunService.customPlan
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.estadosComunService.customSelectedIndex
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
  llenarBotones(){

    //console.log()
    this.estadoButtons ={
      crear: true,
      editar: true,
      eliminar: !this.esAuditor,
      upload: false,
      visualizar: true,
      seleccionar: false,
      crearObservacion: this.esAuditor,
      verObservacion: !this.esAuditor
    };
  }

  listar() {
    if (this.esAuditor) {
      this.servicioPlan.getPlanesPorRol(this.idPersona, 'ROLE_auditor').subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
          for (let i = 0; i < listaDatosPlanes.length; i++) {
            if(listaDatosPlanes[i].estado !== 'Inactivo'){
              this.data.push(listaDatosPlanes[i])

            }
          }
        this.streamDatos$.next(this.data);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
    if (this.esLiderProceso) {
      this.servicioPlan.getPlanesPorRol(this.idPersona, 'ROLE_liderDeProceso').subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
          for (let i = 0; i < listaDatosPlanes.length; i++) {
            if(listaDatosPlanes[i].estado !== 'Inactivo'){
              this.data.push(listaDatosPlanes[i])
            }
          }
        this.streamDatos$.next(this.data);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
    if (this.esAdministrado) {
      this.servicioPlan.getPlanes().subscribe((res: any) => {
        this.planes = res.planes;
        const listaDatosPlanes = res.planes.map((obj) => ({
          identificadorPlan: obj.idPlanMejoramiento,
          nombrePlan: obj.nombre,
          procesoResponsable: obj?.proceso?.nombreProceso,
          estado: obj.estado,
        }));
        this.streamDatos$.next(listaDatosPlanes);
      },
      () => {
        this.streamDatos$.next([]);
      });
    }
  }

  agregar() {
    this.router.navigate(['/home/planes-mejora/historial/planes/agregar']);
    // this.evSelectedIndex.emit(0);
  }

  onDeletePlan(planSeleccionado) {
    //this.servicioPlan.getPlanConsultar(this.planes[0].codeURL).subscribe(res=>console.log(res))
    Swal.fire({
      title: '¿Deseas eliminar el plan de mejoramiento?',
      text: 'Los datos serán eliminados permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const planAEliminar: plan[] = this.planes.filter(
          (plan) =>
            plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
        );
        this.servicioPlan.deletePlan(planAEliminar[0]).subscribe(() => {
          this.listar();
          Swal.fire('Se elimino con exito el plan de mejora', '', 'success');
        });
      }
    });
  }

  onEditarPlan(planSeleccionado) {
      if((planSeleccionado.estado === 'Ejecución' || planSeleccionado.estado === 'Finalizado') && this.esLiderProceso){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No puedes editar porque el Plan de Mejoramiento está en estado ' + planSeleccionado.estado,
        })
      }else{
        const planAEditar: plan[] = this.planes.filter(
          (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
        );
        this.router.navigate([
          this.router.url + '/agregar',
          planAEditar[0].codeURL,
        ]);
        localStorage.setItem('visualizar', 'false');
        this.estadosComunService.changeSelectedIndex(0);
      }
  }

  onVisualizar(planSeleccionado) {
    this.servicioPlan.setTipoPlan(1);
    this.servicioPlan.setData(true);
    const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    this.router.navigate([
      this.router.url + '/ver-plan',
      planAEditar[0].codeURL,
    ]);
    localStorage.setItem('visualizar', 'true');
    this.estadosComunService.changeSelectedIndex(0);
  }

  onCrearHallazgo(planSeleccionado) {
        const planAAgregarHallazgo: plan[] = this.planes.filter(
          (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
        );
        this.estadosComunService.changePlan(planAAgregarHallazgo[0]);
        this.estadosComunService.changeSelectedIndex(1);
        // this.evPlan.emit(planAAgregarHallazgo[0]);
        // this.evSelectedIndex.emit(1);
        this.router.navigate(['/home/planes-mejora/historial/hallazgos']);
        this.servicioPlan.setPlanAlmacenado(this.planes);
        this.servicioPlan.setIdPlan(planSeleccionado.identificadorPlan);
        //console.log(planSeleccionado.identificadorPlan)
  }

  //OBSERVACIONES

  onVisualizarObservacion(planSeleccionado) {
    console.log(this.planes);
    this.servicioPlan.setTipoPlan(1);
    const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    this.servicioPlan.setData(false);
    this.router.navigate([
      this.router.url + '/ver-plan',planAEditar[0].codeURL
    ]);
    localStorage.setItem('visualizar', 'true');
    this.estadosComunService.changeSelectedIndex(0);

    //this.verificarEstadoComponente()
  }

  estadoBotonVer(listaDatosPlanes){
    /*const planAEditar: plan[] = this.planes.filter(
      (plan) => plan.idPlanMejoramiento === planSeleccionado.identificadorPlan
    );
    if(planAEditar[0].estado === "Formulación"){
      console.log(planAEditar[0].estado)
    }*/
    //console.log(listaDatosPlanes);
    for (let i = 0; i < listaDatosPlanes.length; i++) {
      const elemento = listaDatosPlanes[i];
      //console.log(elemento.estado);
      if(elemento.estado === "Formulación"){
        return this.estadoBotonSiguiente = true;
      }else{
        return this.estadoBotonSiguiente = false;
      }
    }
  }
}
