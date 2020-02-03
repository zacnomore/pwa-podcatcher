import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { PodcastListModule } from '../shared/components/podcast-list/podcast-list.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  { path: ':terms', component: SearchComponent },
  { path: '**', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    PodcastListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
