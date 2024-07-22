import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'add',
    component: FormComponent,
    children: [
      { path: 'list', component: ListComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
