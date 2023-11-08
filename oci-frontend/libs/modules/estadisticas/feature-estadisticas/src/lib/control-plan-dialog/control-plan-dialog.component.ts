import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'unicauca-control-plan-dialog',
  templateUrl: './control-plan-dialog.component.html',
  styleUrls: ['./control-plan-dialog.component.scss'],
})
export class ControlPlanDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {console.log(this.data)}
}
