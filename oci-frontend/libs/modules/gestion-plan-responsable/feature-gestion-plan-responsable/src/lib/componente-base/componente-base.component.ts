import { Component, OnInit } from '@angular/core';
import { AuthService } from '@unicauca/auth';

@Component({
  selector: 'unicauca-componente-base',
  templateUrl: './componente-base.component.html',
  styleUrls: ['./componente-base.component.scss']
})
export class ComponenteBaseComponent implements OnInit {

  public correo: string;
  public rol: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
  }

}
