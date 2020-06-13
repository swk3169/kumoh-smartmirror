import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewspeedNavComponent } from './newspeed-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NewspeedNavComponent],
  exports: [
    NewspeedNavComponent
  ]
})
export class NewspeedNavModule { }
