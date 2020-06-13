import { Injectable } from '@angular/core';
import { GlobalService } from '../store/global.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private url: string;

  constructor(private global: GlobalService, private http: HttpClient) {
    this.url = global.url;
  }

  getUserList() {
    return this.http.get(this.url + '/friend/getUserList');
  }
}