import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from '@unicauca/auth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Dependence,
  Position,
  PositionService,
  Role,
  UserService,
} from '@unicauca/core';

import swal from 'sweetalert2';
import { IDType, IdTypeService } from '@unicauca/modules/usuarios/data-access';

@Component({
  selector: 'unicauca-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  modoEdicionActivo: boolean;

  form: FormGroup;

  public cargos: Position[];
  public roles: Role[];
  public typeIDs: IDType[];
  public dependencias: Dependence[];
  public errors: string[];
  public errores: string[];
  public cargosDeUnaDependencia: Position[];

  public rolesAdmin: Role[] = [];
  ROLE_AUDITOR = 2;
  ROLE_LIDERPROCESO = 3;
  isDisabled = true;
  mostrarBtnVolver = false;
  public idPerson: number;
  public id: number;
  public titulo = '';

  correo: string;
  rol: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private usuarioService: UserService,
    private idTypeService: IdTypeService,
    private activatedRoute: ActivatedRoute,
    private positionService: PositionService
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    this.getCatalogosAndValoresIniciales();
  }

  private verificarEstadoComponente() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      if (this.id) {
        this.isDisabled = false;
        this.modoEdicionActivo = true;
        this.modoEdicion();
      } else {
        this.isDisabled = true;
        this.modoEdicionActivo = false;
        this.modoCreacion();
      }
    });
  }

  private getCatalogosAndValoresIniciales() {
    this.typeIDs = this.idTypeService.getTypeIDs();
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0].split('_')[1];

    this.positionService
      .getDependences()
      .subscribe((dependencias: Dependence[]) => {
        this.dependencias = dependencias;
      });

    this.positionService.getPositions().subscribe((cargos: Position[]) => {
      this.cargos = cargos;
      this.cargosDeUnaDependencia = this.cargos;
      this.verificarEstadoComponente();
    });

    this.usuarioService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.guardarRolesAdmin(this.roles);
    });
  }

  modoEdicion() {
    this.usuarioService
      .getUsuario(this.id)
      .pipe(debounceTime(5000))
      .subscribe((usuario: any) => {
        this.idPerson = usuario.objPerson.id;
        this.form.patchValue({
          names: usuario.objPerson.names,
          surnames: usuario.objPerson.surnames,
          idPerson: usuario.objPerson.idPerson,
          documentType: usuario.objPerson.documentType,
          email: usuario.objPerson.email,
          objDependence: usuario.objPerson.objPosition.objDependence.id,
          objPosition: this.getPositionPorNombre(
            usuario.objPerson.objPosition.positioName
          ).id,
          objRole: usuario.objRole.id,
        });
        this.titulo = 'Editar un usuario';
        if (localStorage.getItem('visualizar') === 'true') {
          this.form.disable();
          this.mostrarBtnVolver = true;
          this.titulo = 'Ver un usuario';
        }
      });
  }
  modoCreacion() {
    this.form.patchValue({
      documentType: this.typeIDs[0].type,
    });
    this.titulo = 'Crear un usuario';
  }

  public crearUsuario(event: Event) {
    if (this.modoEdicionActivo) {
      this.updateUsuario(event);
    } else {
      this.guardarModoCreacion(event);
    }
  }

  buscarRol() {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id == this.form.get('objRole').value) {
        return this.roles[i];
      }
    }
  }
  updateUsuario($event): void {
    // $event.preventDefault();
    // this.objDependencceField.setValue(this.buscarDependencia());
    // this.cargoField.setValue(this.buscarCargo());
    const cargo = this.buscarCargo();
    const dependencia = this.buscarDependencia();
    const posicion: Position = {id: cargo.id, positioName: cargo.positioName, objDependence: dependencia}
    const user = {
      username: this.form.value.email,
      objPerson: {
        id: this.idPerson,
        names: this.form.value.names,
        surnames: this.form.value.surnames,
        idPerson: this.form.value.idPerson,
        documentType: this.form.value.documentType,
        email: this.form.value.email,
        objPosition: posicion,
      },
      objRole: this.buscarRol(),
    };
    this.usuarioService.update(user, this.id).subscribe(
      (respose) => {
        this.router.navigate(['/home/admin/gestion-usuarios/historial']);
        swal.fire(
          '¡Usuario Actualizado!',
          `Usuario actualizado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
      }
    );
  }

  guardarModoCreacion(event: Event) {
    // event.preventDefault();
    // this.objDependencceField.setValue(this.buscarDependencia());
    // this.cargoField.setValue(this.buscarCargo());
    const cargo = this.buscarCargo();
    const dependencia = this.buscarDependencia();
    const posicion: Position = {id: cargo.id, positioName: cargo.positioName, objDependence: dependencia}
    const user = {
      objPerson: {
        names: this.form.value.names,
        surnames: this.form.value.surnames,
        idPerson: this.form.value.idPerson,
        documentType: this.form.value.documentType,
        email: this.form.value.email,
        objPosition: posicion,
        // objPosition: this.form.value.objPosition,
      },
      objRole: this.roles.find((role) => role.id === this.form.value.objRole),
    };
    this.usuarioService.create(user).subscribe(
      (respose) => {
        this.router.navigate(['/home/admin/gestion-usuarios/historial']);
        swal.fire('Nuevo usuario', `¡Usuario creado con éxito!`, 'success');
      },
      (err) => {
        swal.fire('Error', `${err.error.mensaje}`, 'error');
      }
    );
  }

  getErrorMessage() {
    if (
      this.nameField.hasError('required') ||
      this.lastNameField.hasError('required') ||
      this.documentTypeField.hasError('required') ||
      this.idPersonField.hasError('required') ||
      this.objDependencceField.hasError('required') ||
      this.cargoField.hasError('required') ||
      this.emailField.hasError('required') ||
      this.objRoleField.hasError('required')
    ) {
      return 'Debes ingresar un valor';
    }
    return this.emailField.hasError('email') ? 'No es un email válido' : '';
  }

  guardarRolesAdmin(roles: Role[]) {
    for (let rol of roles) {
      if (rol.id == this.ROLE_AUDITOR || rol.id == this.ROLE_LIDERPROCESO) {
        this.rolesAdmin.push(rol);
      }
    }
  }

  buscarCargo() {
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.cargos[i].id === this.form.get('objPosition').value) {
        return this.cargos[i];
      }
    }
  }

  getPositionPorNombre(nombre: string) {
    return this.cargos.find((cargo) => cargo.positioName === nombre);
  }

  buscarDependencia() {
    for (let i = 0; i < this.dependencias.length; i++) {
      if (
        this.dependencias[i].id ==
        this.form.get('objDependence').value
      ) {
        return this.dependencias[i];
      }
    }
  }

  onChange(objDependence: number) {
    const cargo = this.buscarCargo();
    this.cargosDeUnaDependencia = [];
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.modoEdicionActivo) {
        if (this.buscarDependencia().id == this.cargos[i].objDependence.id) {
          this.cargosDeUnaDependencia.push(this.cargos[i]);
        }
      } else {
        if (objDependence === this.cargos[i].objDependence.id) {
          this.cargosDeUnaDependencia.push(this.cargos[i]);
        }
      }
    }
    if (cargo !== undefined) {
      const considencia = this.cargosDeUnaDependencia.filter(cargoFiltro => cargoFiltro.positioName === cargo.positioName)
      this.cargoField.setValue(considencia[0].id);
    }
    this.isDisabled = false;
  }

  private builForm() {
    this.form = this.formBuilder.group({
      names: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      surnames: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      idPerson: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      objDependence: ['', [Validators.required]],
      objPosition: ['', [Validators.required]],
      objRole: ['', [Validators.required]],
    });
  }

  get nameField() {
    return this.form.get('names');
  }
  get lastNameField() {
    return this.form.get('surnames');
  }
  get documentTypeField() {
    return this.form.get('documentType');
  }
  get idPersonField() {
    return this.form.get('idPerson');
  }
  get objDependencceField() {
    return this.form.get('objDependence');
  }
  get cargoField() {
    return this.form.get('objPosition');
  }
  get emailField() {
    return this.form.get('email');
  }
  get objRoleField() {
    return this.form.get('objRole');
  }

  protected readonly console = console;
}
