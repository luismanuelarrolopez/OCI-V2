import { FiltroFechasPipe } from './../../../../../../shared/pipes/src/lib/filtro-fechas.pipe';
import { map } from 'rxjs/operators';
/*------------------Importaciones------------------*/
// Angular
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

// Terceros
import swal from 'sweetalert2';
import * as moment from 'moment';

// Libs
import { AuthService } from '@unicauca/auth';
import { logins, serviceHistorialIngresos } from '@unicauca/core';

import { BehaviorSubject } from 'rxjs';
import { Columna, TipoColumna } from '@unicauca/shared/components/tabla';
@Component({
  selector: 'unicauca-ingresos-usuarios',
  templateUrl: './ingresos-usuarios.component.html',
  styleUrls: ['./ingresos-usuarios.component.scss'],
})
export class IngresosUsuariosComponent implements OnInit {
  titulo = '';
  activarFiltroItems = true;

  streamDatos$ = new BehaviorSubject<any[]>([]);

  columnas: Columna[] = [
    { nombreCelda: 'nombre', nombreCeldaHeader: 'Nombre' },
    { nombreCelda: 'cargo', nombreCeldaHeader: 'Cargo' },
    { nombreCelda: 'rol', nombreCeldaHeader: 'Rol', tipo: TipoColumna.ROL },
    {
      nombreCelda: 'fechaIngreso',
      nombreCeldaHeader: 'Fecha ingreso',
      tipo: TipoColumna.FECHA,
    },
  ];

  correo: string;
  rol: string;
  historial: logins[] = [];

  public busquedaForm: FormGroup;

  public datofecha1 = '';
  public datofecha2 = '';

  // public fechaHoy = '';
  public fechaHoy: Date;
  public fechaMaxima: Date;

  mostrarTodo = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private historialIngService: serviceHistorialIngresos
  ) {
    this.buildbusquedaForm();
  }

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
    this.fechaDeHoy();
    this.getAllIngresos();
  }

  fechaDeHoy() {
    const dtToday = new Date();
    let month = dtToday.getMonth() + 1; // getMonth() is zero-based
    let day = dtToday.getDate();
    const year = dtToday.getFullYear();
    if (month < 10) month = parseInt('0' + month.toString());
    if (day < 10) day = parseInt('0' + day.toString());
    // this.fechaHoy = year + '-' + month + '-' + day;
    this.fechaHoy = dtToday;
    this.fechaMaxima = dtToday;
  }

  /**Formulario de busqueda */
  private buildbusquedaForm() {
    this.busquedaForm = this.formBuilder.group({
      fechaInicio: ['', []],
      fechaFin: ['', []],
    });
    this.busquedaForm.get('fechaInicio').valueChanges.subscribe((value) => {
      this.datofecha1 = value;
    });
    this.busquedaForm.get('fechaFin').valueChanges.subscribe((value) => {
      this.datofecha2 = value;
    });
  }

  getAllIngresos() {
    this.historialIngService
      .historialIng()
      .pipe(
        map((lista) =>
          lista.map((obj) => ({
            nombre: `${obj?.objUser?.objPerson?.names} ${obj?.objUser?.objPerson?.surnames}`,
            cargo: obj?.objUser?.objPerson?.objPosition?.positioName,
            rol: obj?.historicalRole,
            fechaIngreso: obj?.loginDate,
          }))
        )
      )
      .subscribe((res) => {
        this.historial = res;
        this.streamDatos$.next(this.historial);
      });
  }

  /**Metodos de busqueda  */
  private fechasincompletas(): boolean {
    if (this.datofecha1 == '' || this.datofecha2 == '') {
      return true;
    }
  }

  buscarOnclick() {
    if (this.fechasincompletas()) {
      swal.fire(
        'Error',
        'Debe ingresar la fecha de inicio y la fecha fin para buscar',
        'error'
      );
    } else {
      this.getAgendasFecha(this.datofecha1, this.datofecha2);
    }
  }

  public async getAgendasFecha(fechaInicio: string, fechaFin: string) {
    const listaFiltrada = this.historial.filter((fila) =>
      this.verificarSiEstanEnRangoFechas(
        fila.fechaIngreso,
        fechaInicio,
        fechaFin
      )
    );
    this.streamDatos$.next(listaFiltrada);
    this.mostrarTodo = true;
  }
  verificarSiEstanEnRangoFechas(
    loginDate: Date,
    fechaInicio: string,
    fechaFin: string
  ): boolean {
    const two_days_ago = moment(fechaInicio).format('l');
    const last_modified = moment(fechaFin).format('l');
    const fechaComparacion = moment(loginDate).format('l');
    return (
      two_days_ago <= fechaComparacion && fechaComparacion <= last_modified
    );
  }

  reset() {
    this.streamDatos$.next(this.historial);
    this.mostrarTodo = false;
    this.busquedaForm.get('fechaInicio').setValue('');
    this.busquedaForm.get('fechaFin').setValue('');
  }

  cambiarFechaActual(){
    this.fechaMaxima = this.busquedaForm.get('fechaFin').value;
  }
}
