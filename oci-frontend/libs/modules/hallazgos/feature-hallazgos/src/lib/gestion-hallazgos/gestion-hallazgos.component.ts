import {
  plan,
  PlanService,
} from '@unicauca/modules/plan-mejoramiento/data-access';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HallazgoService } from 'libs/modules/hallazgos/data-access/src/lib/service/hallazgo.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'unicauca-gestion-hallazgos',
  templateUrl: './gestion-hallazgos.component.html',
  styleUrls: ['./gestion-hallazgos.component.scss'],
})
export class GestionHallazgosComponent implements OnInit {
  formularioHallazgo: FormGroup;
  titulo = '';
  nombreBoton = '';
  plan: plan;
  codeUrl: string;
  idHallazgo: number;

  mostrarBtnVolver = false;
  modoEdicionActivo = false;

  contador = 0;

  unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private planService: PlanService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private hallazgoService: HallazgoService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.verificarEstadoComponente();
  }

  verificarEstadoComponente() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((respuestaURL) => {
          this.codeUrl = respuestaURL.get('idCode');
          this.idHallazgo = parseInt(respuestaURL.get('idHallazgo'));
          return this.planService.getPlanConsultar(this.codeUrl);
        })
      )
      .subscribe((objPlan: any) => {
        this.plan = objPlan.planMejoramiento;
        if (this.idHallazgo) {
          this.modeEdicion();
          this.modoEdicionActivo = true;
        } else {
          this.modoCreacion();
          this.modoEdicionActivo = false;
        }
      });
  }

  private crearFormulario(): void {
    this.formularioHallazgo = this.formBuilder.group({
      id_hallazgo: [null],
      hallazgo: [null, Validators.required],
      objPlan: [null],
    });
  }

  private modoCreacion(): void {
    this.objPlan.setValue(this.plan);
    this.titulo = 'Registrar hallazgo';
    this.nombreBoton = 'Guardar';
  }

  private modeEdicion(): void {
    this.titulo = 'Editar hallazgo';
    this.nombreBoton = 'Editar';
    this.hallazgoService
      .getHallazgoPorId(this.idHallazgo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respuestaBack: any) => {
        this.formularioHallazgo.setValue(respuestaBack.hallazgo);
        const cadena: string = respuestaBack.hallazgo.hallazgo;
        this.contador = cadena.length;
      });
    if (localStorage.getItem('visualizar') === 'true') {
      this.formularioHallazgo.disable();
      this.mostrarBtnVolver = true;
      this.titulo = 'Ver hallazgo';
    }
  }

  public onDesicionCreacionOEditar(): void {
    this.modoEdicionActivo ? this.onEditar() : this.onGuardar();
  }
  public onEditar(): void {
    if (this.formularioHallazgo.invalid) {
      return;
    }
    this.hallazgoService
      .editarHallazgo(this.formularioHallazgo.value, this.id_hallazgo.value)
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
    if (this.formularioHallazgo.invalid) {
      return;
    }
    this.hallazgoService
      .crearHallazgo(this.formularioHallazgo.value)
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
    this.router.navigate(['/home/planes-mejora/historial/hallazgos']);
  }

  get id_hallazgo() {
    return this.formularioHallazgo.get('id_hallazgo');
  }
  get hallazgo() {
    return this.formularioHallazgo.get('hallazgo');
  }
  get objPlan() {
    return this.formularioHallazgo.get('objPlan');
  }
  onKey(event) {
    this.contador = event.target.value.length;
  }
}
