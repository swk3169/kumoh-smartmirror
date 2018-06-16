import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  go(id: string) {
    document.getElementById(id).scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
