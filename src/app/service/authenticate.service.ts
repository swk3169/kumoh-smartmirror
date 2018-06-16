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

   authenticate(user_id: string, user_name: string, user_image: string): Observable<any> {
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${user_image}`)));
    return this.http.post(this.url + '/loginProcess', null, {headers: {Authorization: `Beare ${encoded}`}});
  }

  encryptUserInfo(user_id: string, user_name: string,  user_image: string) {
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${user_image}`)));
    return encoded;
  }

  isLogin(encoded: string) {
    return this.http.post(this.url + '/loginProcess', null, {headers: {Authorization: `Beare ${encoded}`}});
  }
}