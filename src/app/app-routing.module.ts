import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"filter",
    component:FilterPageComponent
  },
  {
    path:"",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
