import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { DateOnlyPipe } from './pipes/date-only.pipe';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoadingScreenComponent,
    DateOnlyPipe,
    NotFoundComponent
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
