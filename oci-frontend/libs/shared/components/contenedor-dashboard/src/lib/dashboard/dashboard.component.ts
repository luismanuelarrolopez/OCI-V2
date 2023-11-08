import { Component, Input } from '@angular/core';
@Component({
  selector: 'unicauca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() inTitulo: string;
  @Input() inCorreo: string;
  @Input() inRol: string;

  constructor() {}
}
