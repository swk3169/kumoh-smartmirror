import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewspeedCRoutingModule } from './newspeed-c-routing.module';
import { NewspeedCComponent } from './newspeed-c.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { WriteModule } from '../write/write.module';
import { NewspeedNavModule } from '../newspeed-nav/newspeed-nav.module';


@NgModule({
  imports: [
    CommonModule,
    NewspeedCRoutingModule,
    NavBarModule,
    WriteModule,
    NewspeedNavModule,
    ReactiveFormsModule
  ],
  declarations: [NewspeedCComponent],
  exports: [
    NewspeedCComponent
  ]
})
export class NewspeedCModule { }
