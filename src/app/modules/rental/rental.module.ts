import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalSearchComponent } from './components/rental-search/rental-search.component';
import { RentalEditComponent } from './components/rental-edit/rental-edit.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';

import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RentalSearchComponent,
    RentalEditComponent,
    RentalListComponent,
    RentalAddComponent,
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
})
export class RentalModule {}
