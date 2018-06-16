import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  _url: string;
  constructor() {
    this._url = 'http://202.31.201.224:443';
    // this._url = 'http://localhost:9988';
  }

  get url () {
    return this._url;
  }
}
