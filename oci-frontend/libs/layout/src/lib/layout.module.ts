import { SharedPipesModule } from './../../../shared/pipes/src/lib/shared-pipes.module';
import { SharedComponentsSpinnerModule } from './../../../shared/components/spinner/src/lib/shared-components-spinner.module';
// Angular
import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Terceros
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Components
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InfoUsuarioComponent } from './info-usuario/info-usuario.component';
import { FeatureCambiarContrasenaComponent } from './feature-cambiar-contrasena/feature-cambiar-contrasena.component';

// Services
import { ReflejarCambiosService } from './data-access/reflejar-cambios.service';

// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'cambiar-contrasena',
    component: FeatureCambiarContrasenaComponent,
  },
];
@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    InicioComponent,
    FooterComponent,
    InfoUsuarioComponent,
    FeatureCambiarContrasenaComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    PerfectScrollbarModule,

    SharedPipesModule,
    SharedComponentsSpinnerModule,

    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,

    RouterModule.forChild(routes),
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    InicioComponent,
    FeatureCambiarContrasenaComponent,
  ],
  providers: [ReflejarCambiosService],
})
export class LayoutAppModule {
  // static forRoot(): ModuleWithProviders<LayoutAppModule> {
  //   return {
  //     ngModule: LayoutAppModule,
  //     providers: [
  //       ReflejarCambiosService,
  //       {
  //         provide: HTTP_INTERCEPTORS,
  //         useClass: InterceptorService,
  //         multi: true
  //       }
  //     ],
  //   };
  // constructor(@Optional() @SkipSelf() layoutAppModule: LayoutAppModule) {
  //   if (layoutAppModule) {
  //     throw new Error(
  //       'layoutAppModule is already loaded. Import it in the AppModule only'
  //     );
  //   }
  // }
}
