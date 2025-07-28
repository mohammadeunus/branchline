import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesListComponent } from './components/devices-list/devices-list.component';

@NgModule({
  declarations: [
    DevicesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }