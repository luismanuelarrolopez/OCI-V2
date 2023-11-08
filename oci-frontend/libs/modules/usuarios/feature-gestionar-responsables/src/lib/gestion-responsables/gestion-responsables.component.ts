import { IDType, IdTypeService } from '@unicauca/modules/usuarios/data-access';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthService } from '@unicauca/auth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  Position,
  Role,
  Dependence,
  UserService,
  PositionService,
} from '@unicauca/core';
import Swal from 'sweetalert2';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'unicauca-gestion-responsables',
  templateUrl: './gestion-responsables.component.html',
  styleUrls: ['./gestion-responsables.component.scss'],
})
export class GestionResponsablesComponent implements OnInit {
  modoEdicionActivo: boolean;

  form: FormGroup;

  rolResponsable = 'ROLE_responsable';

  public cargos: Position[] = [];
  public roles: Role[] = [];
  public typeIDs: IDType[];
  public dependencias: Dependence[] = [];
  public errors: string[];
  public errores: string[];
  public cargosDeUnaDependencia: Position[];
  isDisabled = true;
  mostrarBtnVolver = false;
  correo: string;
  rol: string;

  public id: number;
  public idPerson: number;
  public titulo = '';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private usuarioService: UserService,
    private positionService: PositionService,
    private idTypeService: IdTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  modoCreacion() {
    this.form.patchValue({
      documentType: this.typeIDs[0].type,
    });
    this.titulo = 'Crear un responsable';
  }

  modoEdicion() {
    this.usuarioService
      .getUsuario(this.id)
      .pipe(debounceTime(5000))
      .subscribe((usuario) => {
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
        this.titulo = 'Editar un responsable';
        if (localStorage.getItem('visualizar') === 'true') {
          this.form.disable();
          this.mostrarBtnVolver = true;
          this.titulo = 'Ver un responsable';
        }
      });
  }

  getPositionPorNombre(nombre: string) {
    return this.cargos.find((cargo) => cargo.positioName === nombre);
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
    });
  }

  getCatalogosAndValoresIniciales() {
    this.usuarioService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.form.patchValue({ objRole: this.obtenerRolResponsable().roleName });
    });

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
  }

  private obtenerRolResponsable() {
    let rolSeleccionado: Role = new Role();
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName == this.rolResponsable) {
        rolSeleccionado = this.roles[i];
        break;
      }
    }
    return rolSeleccionado;
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

  buscarCargo() {
    for (let i = 0; i < this.cargos.length; i++) {
      if (this.cargos[i].id === this.form.get('objPosition').value) {
        return this.cargos[i];
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

  crearResponsable(responsable) {
    if (this.modoEdicionActivo) {
      this.EditarResponsable(responsable);
    } else {
      this.guardarResponsable(responsable);
    }
  }

  guardarResponsable(event: Event) {
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
      },
      objRole: this.obtenerRolResponsable(),
    };
    this.usuarioService.create(user).subscribe(
      () => {
        this.router.navigate(['/home/admin/gestion-responsables/historial']);
        Swal.fire(
          'Nuevo responsable',
          `¡Responsable creado con éxito!`,
          'success'
        );
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  EditarResponsable(event: Event) {
    // event.preventDefault();
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
      objRole: this.obtenerRolResponsable(),
    };
    this.usuarioService.update(user, this.id).subscribe(
      () => {
        this.router.navigate(['/home/admin/gestion-responsables/historial']);
        Swal.fire(
          '¡Responsable Actualizado!',
          `Responsable actualizado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
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
      this.emailField.hasError('required')
    ) {
      return 'Debes ingresar un valor';
    }
    return this.emailField.hasError('email') ? 'No es un email válido' : '';
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
}
