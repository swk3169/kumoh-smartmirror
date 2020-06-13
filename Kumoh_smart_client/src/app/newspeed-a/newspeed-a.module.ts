import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewspeedARoutingModule } from './newspeed-a-routing.module';
import { NewspeedAComponent } from './newspeed-a.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { WriteModule } from '../write/write.module';
import { NewspeedNavModule } from '../newspeed-nav/newspeed-nav.module';

@NgModule({
  imports: [
    CommonModule,
    NewspeedARoutingModule,
    NavBarModule,
    WriteModule,
    NewspeedNavModule,
    ReactiveFormsModule
  ],
  declarations: [NewspeedAComponent],
  exports: [
    NewspeedAComponent
  ]
})
export class NewspeedAModule { }
