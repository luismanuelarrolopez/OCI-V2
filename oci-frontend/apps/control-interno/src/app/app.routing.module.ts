import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  FeatureCambiarContrasenaComponent,
  InicioComponent,
  LayoutComponent,
} from '@unicauca/layout';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
      },
      {
        path: 'cambiar-contrasena',
        component: FeatureCambiarContrasenaComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('@unicauca/modules/usuarios/feature-shell').then(
            (module) => module.ModulesUsuariosFeatureShellModule
          ),
      },
      {
        path: 'planes-mejora',
        loadChildren: () =>
          import('@unicauca/modules/plan-mejoramiento/feature-shell').then(
            (module) => module.ModulesPlanMejoramientoFeatureShellModule
          ),
      },
      {
        path: 'hallazgos',
        loadChildren: () =>
          import('@unicauca/modules/hallazgos/feature-shell').then(
            (module) => module.ModulesHallazgosFeatureShellModule
          ),
      },
      {
        path: 'causas',
        loadChildren: () =>
          import('@unicauca/modules/causas/feature-shell').then(
            (module) => module.ModulesCausasFeatureShellModule
          ),
      },
      {
        path: 'acciones',
        loadChildren: () =>
          import('@unicauca/modules/acciones/feature-shell').then(
            (module) => module.ModulesAccionesFeatureShellModule
          ),
      },
      {
        path: 'actividades',
        loadChildren: () =>
          import('@unicauca/modules/actividades/feature-shell').then(
            (module) => module.ModulesActividadesFeatureShellModule
          ),
      },
      {
        path: 'seguimiento-plan-mejora',
        loadChildren: () =>
          import(
            '@unicauca/modules/seguimiento-plan-mejora/feature-shell'
          ).then(
            (module) => module.ModulesSeguimientoPlanMejoraFeatureShellModule
          ),
      },
      {
        path: 'gestion-plan-responsable',
        loadChildren: () =>
          import('@unicauca/modules/gestion-plan-responsable/feature-shell').then(
            (module) => module.ModulesGestionPlanResponsableFeatureShellModule
          ),
      },
      {
        path: 'estadisticas',
        loadChildren: () =>
          import('@unicauca/modules/estadisticas/feature-shell').then(
            (module) => module.ModulesEstadisticasFeatureShellModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@unicauca/auth').then((module) => module.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
