import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'unicauca-actividad-dialog',
  templateUrl: './actividad-dialog.component.html',
  styleUrls: ['./actividad-dialog.component.scss']
})
export class ActividadDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
