import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';

import {NavBarModule} from '../nav-bar/nav-bar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavBarModule
  ],
  declarations: [],
  exports: []
})
export class MainModule { }