import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessPageComponent } from './process-page/process-page.component';

const routes: Routes = [
  { path: 'page/:id', component: ProcessPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
