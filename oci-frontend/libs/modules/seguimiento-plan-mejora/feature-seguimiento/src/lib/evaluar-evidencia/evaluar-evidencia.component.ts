import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Soporte } from 'libs/modules/gestion-plan-responsable/data-access/src/lib/model/soperte.model';
import { Evaluacion } from 'libs/modules/seguimiento-plan-mejora/data-access/src/lib/model/evaluacion.model';
import { EvaluacionService } from 'libs/modules/seguimiento-plan-mejora/data-access/src/lib/service/evaluacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'unicauca-evaluar-evidencia',
  templateUrl: './evaluar-evidencia.component.html',
  styleUrls: ['./evaluar-evidencia.component.scss'],
})
export class EvaluarEvidenciaComponent implements OnInit {
  public contador = 0;
  public estadoEvidencia = '';
  public observacionAuditor = '';
  public listadoEvidencia: string[] = ['Aprobado', 'Rechazado'];

  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<EvaluarEvidenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public soperteSeleccionado: Soporte,
    private evaluacionService: EvaluacionService
  ) {}

  ngOnInit(): void {
    this.obtenerEvaluacion();
  }

  private obtenerEvaluacion(): void {
    this.evaluacionService
      .getEvaluacionId(this.soperteSeleccionado.idEvaluacion)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.observacionAuditor = res.observacion;
        this.estadoEvidencia = res.estado;
        if (this.observacionAuditor !== null) {
          const cadena: string = res.observacion;
          this.contador = cadena.length;
        }
      });
  }

  public onGuardar(): void {
    if (
      this.estadoEvidencia === 'Pendiente' ||
      this.observacionAuditor === null
    ) {
      return;
    }
    const evaluacion: Evaluacion = {
      id: this.soperteSeleccionado.idEvaluacion,
      estado: this.estadoEvidencia,
      observacion: this.observacionAuditor,
    };
    this.evaluacionService
      .editarEvaluacion(evaluacion)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.dialogRef.close());
  }

  public onCancelar(): void {
    Swal.fire({
      title: `Advertencia`,
      text: '¿Desear cancelar la acción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        return this.dialogRef.close();
      }
    });
  }

  onKey(event) {
    this.contador = event.target.value.length;
  }
}
