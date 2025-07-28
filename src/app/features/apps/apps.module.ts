import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsListComponent } from './components/apps-list/apps-list.component';

@NgModule({
  declarations: [
    AppsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppsRoutingModule
  ]
})
export class AppsModule { }