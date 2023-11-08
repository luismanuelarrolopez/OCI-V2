import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
/**
 * Componente para la creación del gráfico de
 * pastel o torta utilizando la librería ngx-charts
 * y todas sus opciones
 * @export
 * @class PastelGraficoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'unicauca-pastel-grafico',
  templateUrl: './pastel-grafico.component.html',
  styleUrls: ['./pastel-grafico.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PastelGraficoComponent implements OnInit {
  /**CONFIGURACIÓN DE OPCIONES NGX-PIE-CHART*/
  /**
   * Array que determina el tamaño del contenedor del gráfico
   * @type {[number, number]}
   * @memberof PastelGraficoComponent
   */
  view: [number, number] = [300, 270];
  /**
   * Booleano que determina si se usa gradiente para los colores
   * dentro del gráfico
   * @type {boolean}
   * @memberof PastelGraficoComponent
   */
  gradient: boolean = false;
  /**
   * Booleano que determina si se muestra la leyenda del gráfico
   * @type {boolean}
   * @memberof PastelGraficoComponent
   */
  showLegend: boolean = true;
  /**
   * Booleano que determina si se muestran las etiquetas del
   * gráfico
   * @type {boolean}
   * @memberof PastelGraficoComponent
   */
  showLabels: boolean = false;
  /**
   * Booleano que determina si el gráfico debe renderizarse
   * en forma de dona
   * @type {boolean}
   * @memberof PastelGraficoComponent
   */
  isDoughnut: boolean = false;
  /**
   * String que determina la ubicación de la leyenda del gráfico
   * Únicamente hay dos opciones: below y right
   * @type {string}
   * @memberof PastelGraficoComponent
   */
  legendPosition: string = 'below';
  /**
   * String que determina el título de la leyenda
   * El título será provisto por el componente donde
   * se usará
   * @type {string}
   * @memberof PastelGraficoComponent
   */
  @Input() legendTitle: string = '';
  /**
   * Array de objetos que determina los datos (name, value) que se usan
   * para pintar el gráfico de pastel
   * Será provisto por el componente donde se usará.
   * @type {[]}
   * @memberof PastelGraficoComponent
   */
  @Input() information: any[];
  /**
   * Objeto que determina el esquema de colores que tendrá cada porción
   * del gráfico de pastel
   * @memberof PastelGraficoComponent
   */
  colorScheme = {
    domain: ['#ff8282', '#62dfe3', '#b0e8b2', '#fff18f', '#73c2ff'],
  };

  render: boolean = true;

  /**
   * Crea una instancia de PastelGraficoComponent.
   * Asigna los datos (name, value) al objeto gráfico
   * @memberof PastelGraficoComponent
   */
  constructor() {
    Object.assign(this, this.information);
  }

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.buildLabels();
    this.verifyInformation();
  }

  buildLabels(): void {
    let total = 0;
    this.information.forEach((item) => {
      total += item.value;
    });
    for (let index = 0; index < this.information.length; index++) {
      let percent = Math.round((this.information[index].value * 100) / total);
      this.information[index].name =
        this.information[index].name + ': ' + percent.toString() + '%';
    }
  }

  verifyInformation(): void {
    this.information.forEach((item) => {
      if (item.vale > 0) {
        this.render = true;
      }
    });
  }
}
