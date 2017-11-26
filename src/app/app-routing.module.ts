import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessPageComponent } from './process/process-page/process-page.component';

const routes: Routes = [{
    path: '',
    redirectTo: '/page/shop',
    pathMatch: 'full'
  }, {
    path: 'page',
    component: ProcessPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
