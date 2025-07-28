import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { HiringRoutingModule } from './hiring-routing.module';
import { HiringListComponent } from './components/hiring-list/hiring-list.component';

@NgModule({
  declarations: [
    HiringListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HiringRoutingModule
  ]
})
export class HiringModule { }