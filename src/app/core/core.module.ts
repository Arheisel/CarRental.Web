import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { DateOnlyPipe } from './pipes/date-only.pipe';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent,
    LoadingScreenComponent,
    DateOnlyPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    LoadingScreenComponent,
    DateOnlyPipe
  ]
})
export class CoreModule { }
