import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { DialogoSimpleModel } from './dialogo-simple.model';
import { DialogoSimpleComponent } from './dialogo-simple.component';
import { Observable } from 'rxjs';

@Injectable()
export class DialogoSimpleService {

  constructor(private dialog: MatDialog) {}
  mostrarDialogo(msj: DialogoSimpleModel): Observable<any> {
    msj.opcionAceptar = !msj.opcionAceptar ? 'Aceptar' : msj.opcionAceptar;
    const dialogRef = this.dialog.open(DialogoSimpleComponent, { data: msj });
    dialogRef.disableClose = true;
    return dialogRef.afterClosed();
  }
}
