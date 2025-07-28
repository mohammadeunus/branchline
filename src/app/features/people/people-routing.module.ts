import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: ':id',
    component: PersonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }