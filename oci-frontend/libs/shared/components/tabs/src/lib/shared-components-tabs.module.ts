import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  declarations: [TabsComponent, ContainerComponent],
  exports: [TabsComponent, ContainerComponent],
})
export class SharedComponentsTabsModule {}
