import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsUtilizationComponent } from './statistics-utilization/statistics-utilization.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';

import { CoreModule } from 'src/app/core/core.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    StatisticsUtilizationComponent,
    StatisticsListComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    CoreModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule
  ]
})
export class StatisticsModule { }
