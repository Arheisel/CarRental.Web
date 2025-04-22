import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'rentals', loadChildren: () => import('./modules/rental/rental.module').then(m => m.RentalModule) },
  { path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
