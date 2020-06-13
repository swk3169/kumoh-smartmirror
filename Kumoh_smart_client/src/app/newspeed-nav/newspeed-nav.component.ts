import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newspeed-nav',
  templateUrl: './newspeed-nav.component.html',
  styleUrls: ['./newspeed-nav.component.css']
})
export class NewspeedNavComponent implements OnInit {
  user_id: string;
  user_name: string;
  user_image: string;
  isScrolled: boolean;
  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.isScrolled = false;

    var sessionData = sessionStorage.getItem('currentUser');

    this.authenticateService.isLogin(sessionData).subscribe((res: any) => {
      this.user_id = res.user_id;
      this.user_name = res.user_name;
      this.user_image = res.user_image;
    });
  }

  @HostListener('window:scroll', ['$event'])
  test(event: any) {
    this.isScrolled = window.scrollY > 280;
  }

  logout() {
    sessionStorage.clear();
    alert("로그아웃 되었습니다.");
    this.router.navigate(['/main']);
  }
}
