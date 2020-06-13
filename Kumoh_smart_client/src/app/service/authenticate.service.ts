import { Injectable } from '@angular/core';
import { GlobalService } from '../store/global.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private url: string;

  constructor(private global: GlobalService, private http: HttpClient) {
    this.url = global.url;
  }

   authenticate(user_id: string, user_name: string, user_image: string, user_email: string): Observable<any> {
    if(user_image == null) {
      user_image = "http://202.31.202.191:443/images/basic_user_image.jpg"
    }
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${user_image}|${user_email}`)));
    sessionStorage.setItem('currentUser',encoded);
    console.log("encoded:" + encoded);
    return this.http.post(this.url + '/loginProcess', null, {headers: {Authorization: `Beare ${encoded}`}});
  }

  isLogin(encoded: string) {
    return this.http.post(this.url + '/loginProcess/isLogin', null, {headers: {Authorization: `Beare ${encoded}`}});
  }
}