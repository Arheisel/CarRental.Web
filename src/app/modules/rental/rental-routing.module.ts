import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalSearchComponent } from './components/rental-search/rental-search.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RentalSearchComponent },
  { path: 'list', component: RentalListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
