import { Component, OnInit } from '@angular/core';

// Terceros
import swal from 'sweetalert2';

// Libs
import { AuthService } from '@unicauca/auth';
import { SpinnerService } from '@unicauca/core';

import { crearItemsMenuPorTipoUsuario, TipoUsuario } from './layout.extras';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  itemsMenu$ = crearItemsMenuPorTipoUsuario(
    this.crearTipo(this.authService.getUsuario().objRole.toString())
  );
  isAuthenticated = true;
  InfoUsuario: any = {
    nombre: '',
  };

  persona = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.persona =
      this.authService.getUsuario().objPerson.names +
      ' ' +
      this.authService.getUsuario().objPerson.surnames;

    this.InfoUsuario = {
      nombre: this.persona,
    };
    this.router.navigate(['/home/inicio']);
    this.spinnerService.detenerSpinner();
    // swal.fire({
    //   title: `Bienvenido a Control interno`,
    //   text: 'Somos una empresa fifty',
    //   icon: 'success',
    //   timer:3000
    // })
  }

  private crearTipo(role: string): TipoUsuario {
    switch (role) {
      case 'ROLE_administrador': {
        return TipoUsuario.ADMINISTRADOR;
        break;
      }
      case 'ROLE_auditor': {
        return TipoUsuario.AUDITOR;
        break;
      }
      case 'ROLE_liderDeProceso': {
        return TipoUsuario.LIDER_PROCESO;
        break;
      }
      case 'ROLE_responsable': {
        return TipoUsuario.RESPONSABLE;
        break;
      }
      default: {
        return TipoUsuario.ADMINISTRADOR;
      }
    }
  }

  public onLogout(res: boolean): void {
    if (res == true) {
      this.authService.logout();
      swal.fire({
        title: `¡${this.persona}, has cerrado sesión con éxito!`,
        text: 'Vuelve pronto',
        icon: 'success',
      });
      //'', `Hola ${username},`+ " has cerrado sesión con éxito! \r\n vuelve pronto", 'success');
      this.router.navigate(['']);
    }
  }

  public onCambiarContrasena(res: boolean): void {
    this.router.navigate(['/home/cambiar-contrasena']);
  }
}
