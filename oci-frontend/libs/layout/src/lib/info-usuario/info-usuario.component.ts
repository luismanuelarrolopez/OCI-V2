import { Component, OnInit } from '@angular/core';

import { AuthService } from '@unicauca/auth';
import { User, UserService } from '@unicauca/core';
import { ReflejarCambiosService } from '../data-access/reflejar-cambios.service';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss'],
})
export class InfoUsuarioComponent implements OnInit {
  persona: string = '';
  cargo: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private reflejarCambiosService: ReflejarCambiosService
  ) {}

  ngOnInit(): void {
    this.persona =
      this.authService.getUsuario().objPerson.names +
      ' ' +
      this.authService.getUsuario().objPerson.surnames;

    this.reflejarCambiosService.customCargo.subscribe((mng) => {
      this.cargo = mng;

      this.obtenerCargo();
    });
    this.reflejarCambiosService.changeCargo(this.cargo);
  }

  obtenerCargo() {
    this.userService
      .getUsuario(this.authService.getUsuario().id)
      .subscribe((res: User) => {
        this.cargo = res.objPerson.objPosition.positioName;
        this.persona = res.objPerson.names + ' ' + res.objPerson.surnames;
      });
  }
}
