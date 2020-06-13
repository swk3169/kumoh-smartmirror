import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspeedRoutingModule } from './newspeed-routing.module';
import { NewspeedComponent } from './newspeed.component';

import { NavBarModule } from '../nav-bar/nav-bar.module';
import { ProfileModule } from '../profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    NewspeedRoutingModule,
    NavBarModule,
    ProfileModule
  ],
  declarations: [NewspeedComponent],
  exports: [NewspeedComponent]
})
export class NewspeedModule { }
