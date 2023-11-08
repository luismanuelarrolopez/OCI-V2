import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuditorGuard implements CanActivate {
  constructor(private auth: AuthService, private location: Location) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isAuthenticated()) {
      if (this.auth.getUsuario().objRole[0] == 'ROLE_auditor') {
        return true;
      }
    }
    swal
      .fire('Error', 'No tiene permisos para acceder a esta ruta', 'error')
      .then(() => {
        this.back();
        return false;
      });
  }

  back(): void {
    this.location.back();
  }
}
