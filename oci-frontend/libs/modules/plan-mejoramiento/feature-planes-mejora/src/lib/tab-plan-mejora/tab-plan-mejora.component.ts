import { Component, OnInit } from '@angular/core';
import { AuthService } from '@unicauca/auth';
import { plan } from '@unicauca/modules/plan-mejoramiento/data-access';
import { Tab } from 'libs/shared/components/tabs/src/lib/model/tabs.model';
@Component({
  selector: 'unicauca-tab-plan-mejora',
  templateUrl: './tab-plan-mejora.component.html',
  styleUrls: ['./tab-plan-mejora.component.scss'],
})
export class TabPlanMejoraComponent implements OnInit {
  correo: string;
  rol: string;
  plan: plan;

  links: Tab[] = [
    {
      disabled: false,
      id: 0,
      nombre: 'Planes',
      path: '/home/planes-mejora/historial/planes',
    },
    {
      disabled: true,
      id: 1,
      nombre: 'Hallazgos',
      path: '/home/planes-mejora/historial/hallazgos',
    },
    {
      disabled: true,
      id: 2,
      nombre: 'Causas',
      path: '/home/planes-mejora/historial/causas',
    },
    {
      disabled: true,
      id: 3,
      nombre: 'Acciones',
      path: '/home/planes-mejora/historial/acciones',
    },
    {
      disabled: true,
      id: 4,
      nombre: 'Actividades',
      path: '/home/planes-mejora/historial/actividades',
    },
  ];

  activeLink = this.links[0];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.correo = this.authService.getUsuario().objPerson.email;
    this.rol = this.authService.getUsuario().objRole[0];
  }
}
