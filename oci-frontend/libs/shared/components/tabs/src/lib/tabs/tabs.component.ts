import { EstadosComunService } from '@unicauca/core';
import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../model/tabs.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'unicauca-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() inLinks: Tab[] = [];
  activeLink: any;
  anchoCeldas: number;

  unsubscribe$ = new Subject();

  constructor(private estadosComunService: EstadosComunService) {}

  ngOnInit(): void {
    this.estadosComunService.customSelectedIndex.subscribe((idSelect) => {
      this.inLinks[idSelect].disabled=false;
      this.activeLink = this.inLinks.find((elemnt, index) => index === idSelect);
    });
    this.anchoCeldas = 100 % this.inLinks.length;
  }
}
