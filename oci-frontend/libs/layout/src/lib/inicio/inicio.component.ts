import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@unicauca/auth';
import {
  Dependence,
  Position,
  PositionService,
  Role,
  User,
  UserService,
} from '@unicauca/core';

import swal from 'sweetalert2';
import { ReflejarCambiosService } from '../data-access/reflejar-cambios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  contacto: FormGroup;
  submitted = false;

  siAdmin = false;
  editable = false;

  usuario: User = new User();

  cargos: Position[] = [];
  public cargosDeUnaDependencia: Position[];
  dependencias: Dependence[] = [];
  roles: Role[] = [];
  rol: string;

  constructor(
    private user: UserService,
    private autenticado: AuthService,
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private cambiosCargo: ReflejarCambiosService
  ) {}

  ngOnInit(): void {
    //this.usuario = this.autenticado.getUsuario();
    this.formularioVacio();
    this.user
      .getUsuario(this.autenticado.getUsuario().id)
      .subscribe((res: User) => {
        this.usuario = res;
        this.siEsAdmin();
        this.formulario();
        this.siEsAdmin();
        this.listar();

      });
      this.cambiosCargo.customCargo.subscribe((mng) => {
        this.rol = mng
    });
  }

  //listar Cargos, dependencias y roles
  listar() {
    //Lista de roles
    this.user.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
    //Lista de dependencias
    this.positionService
      .getDependences()
      .subscribe((dependencias: Dependence[]) => {
        return (this.dependencias = dependencias);
      });
    //Lista de cargos
    this.positionService.getPositions().subscribe((cargos: Position[]) => {
      this.cargosDeUnaDependencia = cargos;
      this.cargos = cargos;
      this.onChange(this.contacto.controls.dependencia.value);
      return (this.cargos);
    });
  }

  formulario() {
    this.contacto.controls.nombre.setValue(this.usuario.objPerson.names);
    this.contacto.controls.apellidos.setValue(this.usuario.objPerson.surnames);
    this.contacto.controls.identificacion.setValue(
      this.usuario.objPerson.idPerson
    );
    this.contacto.controls.email.setValue(this.usuario.username);
    this.contacto.controls.cargo.setValue(
      this.usuario.objPerson.objPosition.id
    );
    this.contacto.controls.dependencia.setValue(
      this.usuario.objPerson.objPosition.objDependence.id
    );
    this.contacto.controls.rolAplicacion.setValue(
      this.usuario.objRole.roleName
    );
  }

  formularioVacio() {
    this.contacto = this.formBuilder.group({
      nombre: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      apellidos: [
        {
          value: '',
          disabled: true,
        },
        Validators.required,
      ],
      identificacion: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailPattern),
        ],
      ],
      cargo: [{ value: '', disabled: !this.editable }, Validators.required],
      dependencia: [
        { value: '', disabled: !this.editable },
        Validators.required,
      ],
      rolAplicacion: [
        { value: '', disabled: !this.editable },
        Validators.required,
      ],
    });
  }

  buscarCargo() {
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.cargos[i].id == this.contacto.get('cargo').value) {
        return this.cargos[i];
      }
    }
  }

  buscarDependencia() {
    for (let i = 0; i < this.dependencias.length; i++) {
      if (
        this.dependencias[i].id ==
        this.contacto.get('dependencia').value
      ) {
        return {
          id: this.dependencias[i].id,
          dependenceName: this.dependencias[i].dependenceName
        };
      }
    }
  }

  buscarRol() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName == this.contacto.get('rolAplicacion').value) {
        return this.roles[i];
      }
    }
  }
  // validador de correo electrónico
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  siEsAdmin() {
    if (this.usuario.objRole.roleName == 'ROLE_administrador') {
      this.siAdmin = true;
    }
  }

  habilitarCampos() {
    this.contacto.controls.nombre.enable();
    this.contacto.controls.apellidos.enable();
    this.contacto.controls.identificacion.enable();
    this.contacto.controls.email.enable();
    this.contacto.controls.cargo.enable();
    this.contacto.controls.dependencia.enable();
    //this.contacto.controls.rolAplicacion.enable();
  }

  deshabilitarCampos() {
    this.contacto.controls.nombre.disable();
    this.contacto.controls.apellidos.disable();
    this.contacto.controls.identificacion.disable();
    this.contacto.controls.email.disable();
    this.contacto.controls.cargo.disable();
    this.contacto.controls.dependencia.disable();
    this.contacto.controls.rolAplicacion.disable();
  }

  get f() {
    return this.contacto.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
      return;
    }
    this.editable = true;
    this.habilitarCampos();

  }

  guardar() {
    if (this.contacto.invalid) {
      swal.fire(
        '¡Error!',
        `No se pudo actualizar tus datos, por favor verifica los campos`,
        'error'
      );
      return;
    }
    this.usuario.objPerson.names = this.contacto.get('nombre').value;
    this.usuario.objPerson.surnames = this.contacto.get('apellidos').value;
    this.usuario.objPerson.idPerson = this.contacto.get('identificacion').value;
    this.usuario.objPerson.email = this.contacto.get('email').value;
    this.usuario.objPerson.objPosition = this.buscarCargo();
    this.usuario.objPerson.objPosition.objDependence = this.buscarDependencia();
    this.usuario.objRole = this.buscarRol();
    this.user.update(this.usuario, this.autenticado.getUsuario().id).subscribe(
      (respose) => {
        this.editable = false;
        this.deshabilitarCampos();
        this.cambiosCargo.changeCargo(
          this.usuario.objPerson.objPosition.positioName
        );
        swal.fire(
          '¡Usuario Actualizado!',
          `Usuario actualizado con éxito`,
          'success'
        );
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        swal.fire(
          '¡Error!',
          `No se pudo actualizar tus datos, por favor verifica los campos,
          especialmente la identifiación o correo que no existan en la aplicación`,
          'error'
        );
      }
    );
  }

  cancelar() {
    this.editable = false;
    this.deshabilitarCampos();
  }
  onChange(objDependence: number) {
    const cargo = this.buscarCargo();
    this.cargosDeUnaDependencia = [];
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.editable) {
        if (this.buscarDependencia().id == this.cargos[i].objDependence.id) {
          this.cargosDeUnaDependencia.push(this.cargos[i]);
        }
      } else {
        if (objDependence === this.cargos[i].objDependence.id) {
          this.cargosDeUnaDependencia.push(this.cargos[i]);
        }
      }
    }
    const considencia = this.cargosDeUnaDependencia.filter(cargoFiltro => cargoFiltro.positioName === cargo.positioName)
    if (considencia.length !== 0) {
      this.contacto.get('cargo').setValue(considencia[0].id);
    }
  }
}
