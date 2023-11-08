// Angular
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Terceros
import swal from 'sweetalert2';

//Libs
import { User, Person } from '@unicauca/core';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../data-access/auth/auth.service';
@Component({
  selector: 'unicauca-feature-login',
  templateUrl: './feature-login.component.html',
  styleUrls: ['./feature-login.component.scss'],
})
export class FeatureLoginComponent implements OnInit {
  public hidePassword: boolean = true;

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public error: { code: number; message: string } = null;

  public usuario: string;
  public constrasena: string;

  objUsuario: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.objUsuario = new User();
    this.objUsuario.objPerson = new Person();
    if (this.authService.isAuthenticated()) {
      swal.fire(
        '',
        `Hola ${
          this.authService.getUsuario().objPerson.names
        } ya estás autenticado!, por favor cierra sesión si deseas salir`,
        'info'
      );
      let usuario = this.authService.getUsuario();
      this.enrutar(usuario);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.get('username').valueChanges.subscribe((value) => {
      this.usuario = value;
    });
    this.loginForm.get('password').valueChanges.subscribe((value) => {
      this.constrasena = value;
    });
  }
  /**Eventos */

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public async submitLogin() {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.invalid) {
      swal.fire('Error', '¡Usuario y/o contraseña vacias!', 'error');
      return;
    }
    try {
      this.objUsuario.username = this.usuario;
      this.objUsuario.password = this.constrasena;
      this.login();
      /*this.authService.obtenerTokenAcceso(this.objUsuario).subscribe(resp => {
        console.log(resp);
        //swal('Login', `Hola ${this.objUsuario.username}`, `tienes un token de acceso`, 'success');
      });
*/
    } catch (error) {
      console.log(error);
    }
  }

  rutaOlvidoContra(){
    this.router.navigate(['/auth/olvido-password']);
  }

  login() {
    this.authService.obtenerTokenAcceso(this.objUsuario).subscribe(
      (response) => {
        //console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService
          .agregarIngreso(this.authService.getUsuario().username)
          .subscribe();
        //console.log(this.authService.getUsuario());
        this.authService.guardarToken(response.access_token);
        this.router.navigateByUrl('home');

        const usuario = this.authService.getUsuario();
        this.openSnackBar('Bienvenido ', `${usuario.objPerson.names}`);

        //swal.fire('Login', `Hola ${usuario.username}, tienes un token de acceso`, 'success');
      },
      (err) => {
        if (err.status == 400) {
          swal.fire('Error', 'Usuario o contraseña incorrectas!', 'error');
        }
      }
    );
  }

  //preguntar

  enrutar(usuario: User) {
    if (usuario.objRole.toString() == 'ROLE_administrador') {
      this.router.navigateByUrl('home');
    } else {
      if (usuario.objRole.toString() == 'ROLE_auditor') {
        this.router.navigateByUrl('home');
      } else {
        if (usuario.objRole.toString() == 'ROLE_liderDeProceso') {
          this.router.navigateByUrl('home');
        } else {
          if (usuario.objRole.toString() == 'ROLE_responsable') {
            this.router.navigateByUrl('home');
          }
        }
      }
    }
  }
}
