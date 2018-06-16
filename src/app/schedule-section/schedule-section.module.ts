import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleSectionRoutingModule } from './schedule-section-routing.module';
import { ScheduleSectionComponent } from './schedule-section.component';

import { MealService } from '../service/meal.service';
import { ReservationService } from '../service/reservation.service';

@NgModule({
  imports: [
    CommonModule,
    ScheduleSectionRoutingModule
  ],
  declarations: [ScheduleSectionComponent],
  exports: [ScheduleSectionComponent],
  providers: [MealService, ReservationService]
})
export class ScheduleSectionModule { }
