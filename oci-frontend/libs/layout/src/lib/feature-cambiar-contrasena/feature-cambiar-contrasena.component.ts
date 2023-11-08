import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, RecuperarContraService } from '@unicauca/auth';
import { debounceTime } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'unicauca-feature-cambiar-contrasena',
  templateUrl: './feature-cambiar-contrasena.component.html',
  styleUrls: ['./feature-cambiar-contrasena.component.scss'],
})
export class FeatureCambiarContrasenaComponent implements OnInit {
  correo: string;
  rol: string;
  contraUsuario: string;

  admin: boolean;
  auditor: boolean;
  lider: boolean;
  responsable: boolean;

  public contraCoincide = false;
  public loginForm: FormGroup;
  public submitted = false;
  public error: { code: number; message: string } = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private location: Location,
    private cambiarService: RecuperarContraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
    this.admin = false;
    this.auditor = false;
    this.lider = false;
    this.responsable = false;
    //this.enrutarSider();
    this.formulario();
  }

  formulario() {
    this.loginForm = this.formBuilder.group({
      contraNueva: ['', Validators.required],
      contraNuevaRepetida: ['', Validators.required],
    });
    this.loginForm.get('contraNueva').valueChanges.subscribe((value) => {
      this.contraUsuario = value;
    });
    this.loginForm
      .get('contraNuevaRepetida')
      .valueChanges.pipe(debounceTime(700))
      .subscribe((value) => {
        if (value != this.contraUsuario) {
          this.contraCoincide = false;
        } else {
          this.contraCoincide = true;
        }
      });
  }

  enrutarSider() {
    this.router.navigate(['/home/inicio']);
    // console.log(this.rol);
    // if (this.rol == 'ROLE_administrador') {
    //   this.admin = true;
    // } else {
    //   if (this.rol == 'ROLE_auditor') {
    //     this.auditor = true;
    //   } else {
    //     if (this.rol == 'ROLE_liderDeProceso') {
    //       this.lider = true;
    //     } else {
    //       if (this.rol == 'ROLE_responsable') {
    //         this.responsable = true;
    //       }
    //     }
    //   }
    // }
  }

  guardar() {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.invalid) {
      Swal.fire(
        'Error',
        'Contraseñas invalidas, por favor verificar los datos',
        'error'
      );
      return;
    }
    if (!this.contraCoincide) {
      Swal.fire('Error', 'Contraseñas no coinciden', 'error');
      return;
    }
    this.cambiarService
      .cambiarContra(this.authService.getUsuario().id, this.contraUsuario)
      .subscribe((res) => {
        Swal.fire(
          '¡Exito!',
          'Cambio de contraseña correcta, se le ha enviado un correo con su nueva contraseña',
          'success'
        );
        this.location.back();
      });
  }

  cancelar() {
    this.location.back();
  }
}
