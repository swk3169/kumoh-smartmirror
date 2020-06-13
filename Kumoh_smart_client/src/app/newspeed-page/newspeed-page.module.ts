import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspeedPageRoutingModule } from './newspeed-page-routing.module';
import { NewspeedPageComponent } from './newspeed-page.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { NewspeedModule } from '../newspeed/newspeed.module';


@NgModule({
  imports: [
    CommonModule,
    NewspeedPageRoutingModule,
    NavBarModule,
    NewspeedModule
  ],
  declarations: [NewspeedPageComponent],
  exports: [
    NewspeedPageComponent
  ]
})
export class NewspeedPageModule { }