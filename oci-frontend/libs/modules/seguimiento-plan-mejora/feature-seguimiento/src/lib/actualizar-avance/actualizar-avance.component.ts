import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActividadesService } from '@unicauca/modules/actividades/data-access';

@Component({
  selector: 'unicauca-actualizar-avance',
  templateUrl: './actualizar-avance.component.html',
  styleUrls: ['./actualizar-avance.component.scss'],
})
export class ActualizarAvanceComponent implements OnInit {
  avanceFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[1-9][0-9](.[0-9])?$|^100$'),
  ]);
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ActualizarAvanceComponent>,
    private actividadService: ActividadesService,
    @Inject(MAT_DIALOG_DATA) public information: any
  ) {}

  ngOnInit(): void {}

  public onGuardar(): void {
    const data = {
      idActividad: this.information.idActividad,
      idPlan: this.information.idPlan,
      avance: this.avanceFormControl.value,
    };
    this.actividadService
      .updateAvanceActividad(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.dialogRef.close();
        Swal.fire({
          title: 'Avance actualizado',
          text: '¡El porcentaje de avance ha sido actualizado exitosamente!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
      });
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

  public verificarValor(): void {
    if (
      this.avanceFormControl.value > 100 ||
      this.avanceFormControl.value < 0
    ) {
      this.avanceFormControl.setValue(0);
    }
  }
}
