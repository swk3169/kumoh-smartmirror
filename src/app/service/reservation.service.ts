import { Injectable } from '@angular/core';
import { GlobalService } from '../store/global.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {
  private url: string;

  constructor(private global: GlobalService, private http: HttpClient) {
    this.url = global.url;
  }

   loadReservation(): Observable<any> {
    //const encoded = btoa(`${email}:${password}`);
    return this.http.get(this.url + `/information_330`);
  }

}