import { Component, OnInit, Input } from '@angular/core';
import { MealService } from '../service/meal.service';
import { ReservationService } from '../service/reservation.service';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.css']
})
export class ScheduleSectionComponent implements OnInit {
  isLogin: string;
  status: boolean;
  @Input() meal: any;
  cafeterias: string[];
  cafeteriaMapper: string[];
  current: number;
  date : string;
  breakfast : string[];
  lunch : string[];
  dinner : string[];
  states: any[];
  a1:boolean;
  a2:boolean;
  a3:boolean;
  a4:boolean;
  b1:boolean;
  b2:boolean;
  possibility:boolean;

  constructor(private router: Router, private mealService: MealService,private reservationService: ReservationService,  private authenticateService: AuthenticateService) {
     this.possibility=true;
    }

  ngOnInit() {
    if(!sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/main']);
    }

    var sessionData = sessionStorage.getItem('currentUser');

    this.authenticateService.isLogin(sessionData).subscribe((res: any) => {
      this.isLogin = res.status;
      
      if(this.isLogin == "illegal") {
        sessionStorage.clear();
        alert("잘못 된 세션입니다. 다시 로그인 해주세요");
        this.router.navigate(['/main']);
      } 
    });

    this.date = '';
    this.current = 0;
    this.cafeterias = [' 학생식당', ' 교직원식당', ' 푸름관 식당', ' 오름관 1동 식당', ' 오름관 3동 식당'];
    this.cafeteriaMapper = ['student', 'professor', 'blue', 'climb1', 'climb2'];

    this.mealService.loadMeal().subscribe((res: any) => {
      console.log(res);
      this.date = res.date;
      this.breakfast = [res.student_meal_breakfast,res.professor_meal_breakfast,'조식을 제공하지 않습니다.',res.oleum1_dorm_mael_breakfast,'조식을 제공하지 않습니다.'];
      this.lunch = [res.student_meal_lunch,res.professor_meal_lunch,res.fullomhm_dorm_mael_lunch,'중식을 제공하지 않습니다.',res.oleum3_dorm_mael_lunch];
      this.dinner = [ res.student_meal_dinner,res.professor_meal_dinner,res.fullomhm_dorm_mael_dinner,res.oleum1_dorm_mael_dinner,res.oleum3_dorm_mael_dinner];
    });
    this.reservationService.loadReservation().subscribe((res: any) => {
      console.log(res);
        this.a1 = res.a1;
        this.a2 = res.a2;
        this.a3 = res.a3;
        this.a4 = res.a4;
        this.b1 = res.b1;
        this.b2 = res.b2;
      });
  }
  go(id: string) {
    document.getElementById(id).scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
