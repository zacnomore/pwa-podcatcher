import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { WindowComponent } from './window/window.component';
import { WindowModule } from './window/window.module';


const routes: Routes = [
  {
    path: '',
    component: WindowComponent
  }
];
@NgModule({
  imports: [
    MatProgressBarModule,
    RouterModule.forChild(routes),
    WindowModule
  ]
})
export class PlayerModule { }
