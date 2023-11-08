import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'unicauca-circulo-grafico',
  templateUrl: './circulo-grafico.component.html',
  styleUrls: ['./circulo-grafico.component.scss'],
})
export class CirculoGraficoComponent implements OnInit {
  /**
   * String que determina el texto que será renderizado dentro del
   * circulo
   * @type {String}
   * @memberof CirculoGraficoComponent
   */
  @Input() texto: String;
  /**
   * String que determina el título de la mat-card
   * @type {String}
   * @memberof CirculoGraficoComponent
   */
  @Input() titulo: String;

  constructor() {}

  ngOnInit(): void {}
}
