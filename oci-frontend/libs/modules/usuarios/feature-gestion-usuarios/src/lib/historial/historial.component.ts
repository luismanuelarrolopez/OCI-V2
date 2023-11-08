import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@unicauca/auth';
import { UserService } from '@unicauca/core';
import swal from 'sweetalert2';

import {
  EstadoButtons,
  Columna,
  TipoColumna,
} from '@unicauca/shared/components/tabla';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'unicauca-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  rol: string;

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

  constructor(
    private router: Router,
    public authService: AuthService,
    private usuarioService: UserService
  ) {
    this.usuarioService = usuarioService;
  }

  ngOnInit(): void {
    this.getDatosUsuario();
  }

  getDatosUsuario(): void {
    this.usuarioService
      .getUsuarios()
      .pipe(
        map((usuarios: any[]) =>
          usuarios.filter(
            (usuario) => usuario.id !== this.authService.getUsuario().id
          )
        ),
        map((usuarios: any[]) =>
          usuarios.filter(
            (usuario) =>
              usuario.objRole.roleName !== 'ROLE_responsable' &&
              usuario.objRole.roleName !== 'ROLE_administrador'
          )
        ),
        map((usuarios: any[]) =>
          usuarios.map((usuario, index) => ({
            id: usuario.id,
            posicion: index + 1,
            nombre: `${usuario?.objPerson?.names} ${usuario?.objPerson?.surnames}`,
            cargo: usuario?.objPerson?.objPosition?.positioName,
            rol: usuario?.objRole.roleName,
          }))
        )
      )
      .subscribe((usuarios) => this.streamDatos$.next(usuarios));
  }

  onDeleteUsuario(usuario): void {
    swal
      .fire({
        title: '¿Estás seguro?',
        showDenyButton: true,
        confirmButtonText: `Si, eliminar`,
        denyButtonText: `No, cancelar`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.delete(usuario.id).subscribe(() => {
            const lista = this.streamDatos$.value.filter(
              (user) => user.id !== usuario.id
            );
            this.streamDatos$.next(lista);
            swal.fire(
              '¡Usuario eliminado!',
              `El usuario ${usuario.objPerson.names} ${usuario.objPerson.surnames} fue eliminado con éxito`,
              'success'
            );
          });
        }
      });
  }
  onEditarUsuario(usuario): void {
    this.router.navigate(['/home/admin/gestion-usuarios/gestion', usuario.id]);
    localStorage.setItem('visualizar', 'false');
  }

  onVisualizar(usuario) {
    this.router.navigate(['/home/admin/gestion-usuarios/gestion', usuario.id]);
    localStorage.setItem('visualizar', 'true');
  }
}
