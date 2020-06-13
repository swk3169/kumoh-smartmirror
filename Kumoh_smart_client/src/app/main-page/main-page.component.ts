import { Component, OnInit } from '@angular/core';
import { MealService } from '../service/meal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.mealService.loadMeal().subscribe((res: any) => {
    });
  }
  go(id: string) {
    document.getElementById(id).scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
