import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StatisticsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
