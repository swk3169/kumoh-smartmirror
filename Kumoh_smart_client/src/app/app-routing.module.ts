import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewspeedComponent } from './newspeed/newspeed.component';
import { NewspeedAComponent } from './newspeed-a/newspeed-a.component';
import { NewspeedBComponent } from './newspeed-b/newspeed-b.component';
import { NewspeedCComponent } from './newspeed-c/newspeed-c.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  // loadChildren: './main-page/main-page.module#MainPageModule' },
  { path: 'main', component: MainComponent },
  { path: 'main-page', component: MainPageComponent },
  // {path: 'main-page', loadChildren: './main-page/main-page.module#MainPageModule'},
  { path: 'newspeed-a', component: NewspeedAComponent },
  { path: 'newspeed-b', component: NewspeedBComponent },
  { path: 'newspeed-c', component: NewspeedCComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
