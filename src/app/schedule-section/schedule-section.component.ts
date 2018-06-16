import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { MealService } from '../service/meal.service';
import { ReservationService } from '../service/reservation.service';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
declare const webkitSpeechRecognition:any;

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.css']
})
export class ScheduleSectionComponent implements OnInit {
/*  @ViewChild('output') output:ElementRef;
  rec:any;*/
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
  info : string[];
  infoMapper : string[];
  //text:string;
  constructor(private mealService: MealService,private reservationService: ReservationService,  private authenticateService: AuthenticateService) {
     this.possibility=true;
    }

  ngOnInit() {
    //let sessionData = sessionStorage.getItem('encryptUser');
    //let user_data = sessionData.split(':');
    //console.log(user_data[1]);
  /*  this.rec = new webkitSpeechRecognition();
    this.rec.start();
    this.rec.onend   = (event:any) =>{     { this.rec.start();}};
    this.rec.onresult = (event:any) =>{
      console.log(event);
      this.output.nativeElement.innerHTML = event.results[0][0].transcript;
      this.text = event.results[0][0].transcript;
      console.log(this.text);
    };*/
    this.date = '';
    this.current = 0;
    this.cafeterias = [' 학생식당', ' 교직원식당', ' 푸름관 식당', ' 오름관 1동 식당', ' 오름관 3동 식당'];
    this.cafeteriaMapper = ['student', 'professor', 'blue', 'climb1', 'climb2'];
    this.info = ['ScheduleCalendar','Cafeteria','330Reservation'];
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

}
