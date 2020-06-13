import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspeedBRoutingModule } from './newspeed-b-routing.module';
import { NewspeedBComponent } from './newspeed-b.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { NewspeedModule } from '../newspeed/newspeed.module';
import { NewspeedNavModule } from '../newspeed-nav/newspeed-nav.module';
import { WriteModule } from '../write/write.module';

@NgModule({
  imports: [
    CommonModule,
    NewspeedBRoutingModule,
    NavBarModule,
    NewspeedModule,
    NewspeedNavModule,
    WriteModule
  ],
  declarations: [NewspeedBComponent],
  exports: [
    NewspeedBComponent
  ]
})
export class NewspeedBModule { }
