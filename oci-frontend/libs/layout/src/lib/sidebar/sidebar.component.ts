import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ItemMenu } from '../layout/layout.extras';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() inInfoUsuario: any;
  @Input() inIsAuthenticated: boolean;
  @Input() inItemsMenu: ItemMenu[];

  @Output() outLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  outCambiarContrasena: EventEmitter<boolean> = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
  }

  public onLogout(): void {
    this.outLogout.emit(true);
  }

  public onCambiarContrasena(): void {
    this.outCambiarContrasena.emit(true);
  }
}
