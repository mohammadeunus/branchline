import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringListComponent } from './components/hiring-list/hiring-list.component';

const routes: Routes = [
  {
    path: '',
    component: HiringListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringRoutingModule { }