import { Component, Input, OnInit } from '@angular/core';

/**
 * Componente para la creación del gráfico
 * barra de progreso circular con porcentaje
 * estático
 * @export
 * @class PorcentajeGraficoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'unicauca-porcentaje-grafico',
  templateUrl: './porcentaje-grafico.component.html',
  styleUrls: ['./porcentaje-grafico.component.scss'],
})
export class PorcentajeGraficoComponent implements OnInit {
  /**
   * Número que determina el porcentaje a renderizar
   * Se determina desde el componente desde donde
   * será usado
   * @type {number}
   * @memberof PorcentajeGraficoComponent
   */
  @Input() porcentaje: number;
  /**
   * String que determina el título de la mat-card
   * Se determina desde el componente desde donde
   * será usado
   * @type {string}
   * @memberof PorcentajeGraficoComponent
   */
  @Input() titulo: string;
  /**
   * Variable que guarda el cálculo desde donde iniciará el trazo
   * del borde del círculo svg
   * @type {number}
   * @memberof PorcentajeGraficoComponent
   */
  dashoffset: number;

  /**
   * Retorna el valor desde donde inicia
   * el trazo del círculo (stroke-dashoffset)
   * que representará el porcentaje
   * @param {number} stroke longitud del lienzo
   * @return {*}  {number} valor del stroke-dashoffset
   * @memberof PorcentajeGraficoComponent
   */
  calcularDesplazamiento(stroke: number): number {
    return stroke - (stroke * this.porcentaje) / 100;
  }

  constructor() {}

  /**
   * Llama a la función calcularDesplazamiento cuando el
   * componente de Angular ha sido inicializado
   * @memberof PorcentajeGraficoComponent
   */
  ngOnInit(): void {
    this.dashoffset = this.calcularDesplazamiento(345);
  }
  ngOnChanges(): void {
    this.dashoffset = this.calcularDesplazamiento(345);
  }
}
