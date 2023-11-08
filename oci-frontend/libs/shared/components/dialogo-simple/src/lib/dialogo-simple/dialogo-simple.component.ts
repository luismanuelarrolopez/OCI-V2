import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoSimpleModel } from './dialogo-simple.model';

@Component({
  selector: 'unicauca-dialogo-simple',
  templateUrl: './dialogo-simple.component.html',
  styleUrls: ['./dialogo-simple.component.scss']
})
export class DialogoSimpleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogoSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogoSimpleModel
  ) {}

  ngOnInit() {}

  onAceptacion(): void {
    return this.dialogRef.close({ acepto: true, cancelo: false });
  }

  onCancelacion(): void {
    return this.dialogRef.close({ acepto: false, cancelo: true });
  }

}
