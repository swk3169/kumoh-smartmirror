import { Injectable } from '@angular/core';
import { GlobalService } from '../store/global.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private url: string;

  constructor(private global: GlobalService, private http: HttpClient) {
    this.url = global.url;
  }

  loadTimeline(user_id: string, num: number): Observable<any> {
    //const encoded = btoa(`${email}:${password}`);
    return this.http.get(this.url + '/newsfeed/' + user_id + '/' + num);
  }

  loadSpecificTimeline(my_user_id: string, select_user_id: string, num: number): Observable<any> {
    //const encoded = btoa(`${email}:${password}`);
    return this.http.get(this.url + '/newsfeed/specificPage/' + my_user_id + '/' + select_user_id + '/' + num);
  }

  loadComment(user_id: string, board_idx: number): Observable<any> {
    return this.http.get(this.url + '/newsfeed/loadComment/' + user_id + '/' + board_idx);
  }

  clickLike(user_id: string, board_idx: number): Observable<any> {
    return this.http.get(this.url + '/newsfeed/clickLike/' + user_id + '/' + board_idx);
  }

  loadLikeList(board_idx: number): Observable<any> {
    return this.http.get(this.url  + '/newsfeed/getLikeArr/' + board_idx);
  }

  writePost(user_id: string, user_name: string, post: string): Observable<any> {
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${post}`)));
    return this.http.post(this.url + '/newsfeed/writePost', null, {headers: {Authorization: `Beare ${encoded}`}});
  }

  deletePost(board_idx: number): Observable<any>  {
    console.log(board_idx);
    const encoded = btoa(unescape(encodeURIComponent(`${board_idx}`)));
    return this.http.post(this.url + '/newsfeed/deletePost', {board_idx: board_idx});
  }

  /*writePostIncludeImage(form_data: FormData): Observable<any> {
    const encoded = btoa(unescape(encodeURIComponent(`${form_data}`)));
    return this.http.post(this.url + '/newsfeed/writePostIncludeImage', null, {headers: {Authorization: `Beare ${encoded}`}});
  }*/

  writePostIncludeImage(form_data: FormData): Observable<any> {
    return this.http.post(this.url + '/newsfeed/writePostIncludeImage', form_data);
  }

  writePostIncludeImageName(user_id: string, user_name: string, post: string, filename: string): Observable<any> {
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${post}|${filename}`)));
    return this.http.post(this.url + '/newsfeed/writePostIncludeFilename', null, {headers: {Authorization: `Beare ${encoded}`}});
  }

  writeComment(user_id: string, user_name: string, board_idx: number, post: string): Observable<any> {
    console.log(user_id + user_name+ board_idx + post);
    const encoded = btoa(unescape(encodeURIComponent(`${user_id}|${user_name}|${board_idx}|${post}`)));
    return this.http.post(this.url + '/newsfeed/writeComment', null, {headers: {Authorization: `Beare ${encoded}`}});
  }
}