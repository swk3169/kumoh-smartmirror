import {Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
declare const webkitSpeechRecognition:any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isScrolled: boolean;
  constructor(private router :Router) { }
  @ViewChild('output') output:ElementRef;
  rec:any;
  status: boolean;
  text:string;

  ngOnInit() {
    this.isScrolled = false;
    this.rec = new webkitSpeechRecognition();
    this.rec.start();
    this.rec.onend   = (event:any) =>{     { this.rec.start();}};
    this.rec.onresult = (event:any) =>{
      console.log(event);
      this.text = event.results[0][0].transcript;
      if (this.text === '일정 캘린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '일정 켈린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '일정캘린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '일정켈린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '캘린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '켈린더' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '달력' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '달녁' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '일정' ){ document.getElementById('calendar').scrollIntoView({block: 'start', behavior: 'smooth'}); }

      if (this.text === '사용법' ){ document.getElementById('use').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '상법' ){ document.getElementById('use').scrollIntoView({block: 'start', behavior: 'smooth'}); }




      if (this.text === '학생 식단' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 스판' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학식' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 식당' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 일단' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 습관' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 식사' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 밥' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 스펀' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 집단' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '카페테리아' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '박테리아' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생식단' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '학생 식당' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '식단' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '식당' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '습관' ){ document.getElementById('diet1').scrollIntoView({block: 'start', behavior: 'smooth'}); }



      if (this.text === '교직원 식단' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 스판' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교식' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 식당' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 일단' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 습관' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 식사' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 밥' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 스펀' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원 집단' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '조직원' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원식단' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '교직원식당' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '조직원 식단' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '조직원 식당' ){ document.getElementById('diet2').scrollIntoView({block: 'start', behavior: 'smooth'}); }


      if (this.text === '푸름관 식단' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 스판' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸식' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 식당' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 일단' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 습관' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 식사' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 밥' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 스펀' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관 집단' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관식당' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름관식단' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }


      if (this.text === '오름 1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 스판' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 일단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 습관' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 식사' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 밥' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 스펀' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 1동 집단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름일동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }



      if (this.text === '옳은 건 1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '1동 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '1동 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 스판' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 일단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 습관' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 식사' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 밥' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 스펀' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 1동 집단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 식단' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 식당' ){ document.getElementById('diet4').scrollIntoView({block: 'start', behavior: 'smooth'}); }



      if (this.text === '오름 3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 스판' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 일단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 습관' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 식사' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 밥' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 스펀' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름관 3동 집단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 관산동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 관산동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 관산동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }

      if (this.text === '옳은 건 3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '오름 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 스판' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식당' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 일단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 습관' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식사' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 밥' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 스펀' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 집단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '옳은 건 3동 식단' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }



      if (this.text === '푸른 바다' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸른간' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '순간' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '주름관' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸름 건' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸른 건' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸른 간' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '푸른 관' ){ document.getElementById('diet3').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '프로 관' ){ document.getElementById('diet5').scrollIntoView({block: 'start', behavior: 'smooth'}); }







      if (this.text === '330' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '339' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '삼성궁' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '상산고' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '삼성고' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '사상구' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '성공' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '삼성동' ){ document.getElementById('reservation').scrollIntoView({block: 'start', behavior: 'smooth'}); }

      if (this.text === '미러' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '1억' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '거울' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '미러' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '일어' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      if (this.text === '위로' ){ document.getElementById('mirror').scrollIntoView({block: 'start', behavior: 'smooth'}); }
      console.log(this.text);
    };
  }
  go(id: string) {
    document.getElementById(id).scrollIntoView({block: 'start', behavior: 'smooth'});
    console.log(id);
  }

  @HostListener('window:scroll', ['$event'])
  test(event: any) {
    this.isScrolled = window.scrollY > 320;
  }
}
