import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { ScheduleSectionModule } from '../schedule-section/schedule-section.module';




@NgModule({
  imports: [
    CommonModule,
    MainPageRoutingModule,
    NavBarModule,
    ScheduleSectionModule
  ],
  declarations: [MainPageComponent],
  exports: [MainPageComponent]
})
export class MainPageModule { }
