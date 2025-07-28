import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PeopleService } from './services/people.service';

@NgModule({
  declarations: [
    PeopleListComponent,
    PersonDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PeopleRoutingModule
  ],
  providers: [
    PeopleService
  ]
})
export class PeopleModule { }