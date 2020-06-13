import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

declare const Kakao: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  status: boolean;

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit() {
    if(sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/main-page']);
    } else {
      Kakao.init('177fd5bbc7d8a9639fda28d0369eb2c5');
      Kakao.Auth.createLoginButton({
      container: '#kakao-login-container',
      success: (authObj) => {
        //alert(JSON.stringify(authObj));
        Kakao.Auth.getStatus((res: any) => {
          this.authenticateService.authenticate(res.user.id, res.user.properties.nickname, res.user.properties.thumbnail_image, res.user.kaccount_email).subscribe((res: any) => {
            this.status = res.status;
            console.log(this.status);
            
            if(this.status == true) {
              this.router.navigate(['/main-page']);
            } else{
              this.router.navigate(['/main']);
            }
          });
          //this.router.navigate(['/main-page']);
        });
      },
      fail: (err) => {
        alert(JSON.stringify(err));
      }
    });
    }
  }

  go(id: string) {
    document.getElementById(id).scrollIntoView({block: 'start', behavior: 'smooth'});
  }
}
