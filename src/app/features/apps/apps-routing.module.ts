import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsListComponent } from './components/apps-list/apps-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }