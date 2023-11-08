import { AuthService } from '@unicauca/auth';
import { UserService } from '@unicauca/core';
import { MatPaginator } from '@angular/material/paginator';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  Columna,
  EstadoButtons,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'unicauca-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  tituloTabla: '';
  activarFiltroItems = true;
  estadoButtons: EstadoButtons = {
    crear: false,
    editar: true,
    eliminar: true,
    upload: false,
    visualizar: true,
  };
  columnas: Columna[] = [
    { nombreCelda: 'posicion', nombreCeldaHeader: 'Posición' },
    { nombreCelda: 'nombre', nombreCeldaHeader: 'Nombre' },
    { nombreCelda: 'cargo', nombreCeldaHeader: 'Cargo' },
    { nombreCelda: 'rol', nombreCeldaHeader: 'Rol', tipo: TipoColumna.ROL },
    {
      nombreCelda: 'opciones',
      nombreCeldaHeader: 'Opciones',
      tipo: TipoColumna.ACCIONES,
    },
  ];
  streamDatos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  rol: string;

  rolResponsable = 'ROLE_responsable';

  constructor(
    private usuarioService: UserService,
    public authService: AuthService,
    private router: Router
  ) {
    this.usuarioService = usuarioService;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    localStorage.clear();
    // const separador = this.authService.getUsuario().objRole[0].split('_');
    // this.rol = separador[1];
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService
      .getUsuarios()
      .pipe(
        map((usuarios: any[]) =>
          usuarios.filter(
            (responsable) => responsable.objRole.roleName === 'ROLE_responsable'
          )
        ),
        map((usuarios: any[]) =>
          usuarios.map((responsable, index) => ({
            id: responsable.id,
            posicion: index + 1,
            nombre: `${responsable?.objPerson?.names} ${responsable?.objPerson?.surnames}`,
            cargo: responsable?.objPerson?.objPosition?.positioName,
            rol: responsable?.objRole.roleName,
          }))
        )
      )
      .subscribe((usuarios) => this.streamDatos$.next(usuarios));
  }

  onDeleteUsuario(responsable): void {
    Swal.fire({
      title: '¿Estás seguro que desea eliminar este responsable?',
      showDenyButton: true,
      confirmButtonText: `Si, eliminar`,
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(responsable.id).subscribe(() => {
          this.listarUsuarios();
          const lista = this.streamDatos$.value.filter(
            (responsable) => responsable.rol === 'ROLE_responsable'
          );
          this.streamDatos$.next(lista);
          Swal.fire(
            '¡Responsable eliminado!',
            `El responsable ${responsable.nombre} fue eliminado con éxito`,
            'success'
          );
        });
      }
    });
  }
  onEditarUsuario(responsable): void {
    this.router.navigate([
      '/home/admin/gestion-responsables/gestionar-responsables',
      responsable.id,
    ]);
    localStorage.setItem('visualizar', 'false');
  }
  onVisualizar(responsable): void {
    this.router.navigate([
      '/home/admin/gestion-responsables/gestionar-responsables',
      responsable.id,
    ]);
    localStorage.setItem('visualizar', 'true');
  }
}
