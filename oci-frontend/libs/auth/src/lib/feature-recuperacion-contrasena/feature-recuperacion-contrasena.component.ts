import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import swal from 'sweetalert2';

import { User, Person } from '@unicauca/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecuperarContraService } from './../data-access/auth/recuperar-contra.service';

@Component({
  selector: 'unicauca-feature-recuperacion-contrasena',
  templateUrl: './feature-recuperacion-contrasena.component.html',
  styleUrls: ['./feature-recuperacion-contrasena.component.scss'],
})
export class FeatureRecuperacionContrasenaComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public error: { code: number; message: string } = null;

  public usuario: string;
  public constrasena: string;

  objUsuario: User;

  // validador de correo electrónico
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private serviceRecuperacion: RecuperarContraService
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    this.objUsuario = new User();
    this.objUsuario.objPerson = new Person();
  }

  get username() {
    return this.loginForm.get('username');
  }

  createForm() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
    });
  }

  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public async submitLogin() {
    if (this.loginForm.invalid) {
      swal.fire({
        title: 'Error',
        text: '¡Usuario incorrecto o vacio!, por favor verificar el campo requerido',
        icon: 'error'
      });
      return;
    }
    this.serviceRecuperacion.recuperarContrasena(this.username.value).subscribe(
      (res: User) => {
        //console.log(res);

        /*swal.fire({'', 'Contraseña enviada con exito al correo', 'success'},function(){
        swal.fire("Deleted!", "Your imaginary file has been deleted.", "success");
      });*/
        swal.fire({
            title: 'Contraseña enviada con éxito al correo',
            icon: 'success',
            //showDenyButton: true,
            //showCancelButton: true,
            // confirmButtonText: `Aceptar`,
            //denyButtonText: `Don't save`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigateByUrl('');
            }
          });
      },
      (err) => {
        if (err.status == 404) {
          swal.fire('Error', 'Usuario incorrecto!', 'error');
        }
      }
    );

    /*if (this.loginForm.valid) {
      console.log("valido");
    }else{
      console.log("invalido")
    }*/
  }
  //preguntar
  enrutar(usuario: User) {
    if (usuario.objRole.toString() == 'ROLE_administrador') {
      this.router.navigateByUrl('home');
    } else {
      if (usuario.objRole.toString() == 'Role_auditor') {
      } else {
        if (usuario.objRole.toString() == 'Role_liderDeProceso') {
        } else {
        }
        if (usuario.objRole.toString() == 'Role_responsable') {
        }
      }
    }
  }
}
