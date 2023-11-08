import { SharedComponentsSpinnerModule } from './../../../shared/components/spinner/src/lib/shared-components-spinner.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

// Serivces
import { AuthService } from './data-access/auth/auth.service';
import { RecuperarContraService } from './data-access/auth/recuperar-contra.service';
// Components
import { FeatureLoginComponent } from './feature-login/feature-login.component';
import { FeatureRecuperacionContrasenaComponent } from './feature-recuperacion-contrasena/feature-recuperacion-contrasena.component';

const routes: Routes = [
  {
    path: 'olvido-password',
    component: FeatureRecuperacionContrasenaComponent,
  },
  {
    path: 'login',
    component: FeatureLoginComponent,
  },
];

@NgModule({
  declarations: [FeatureLoginComponent, FeatureRecuperacionContrasenaComponent],
  imports: [
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    SharedComponentsSpinnerModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,


    RouterModule.forChild(routes),
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService, RecuperarContraService],
    };
  }
  // constructor(@Optional() authModule: AuthModule) {
  //   if(authModule){
  //     throw new Error(
  //       'authModule ya fue importado, solo se permite que sea importado una única vez en la aplicación'
  //     );
  //   }
  // }
}
