import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _serverUrl = '';
  private _apiKey = '';

  constructor() {}

  public get serverUrl() {
    return this._serverUrl;
  }

  public set serverUrl(url: string) {
    this._serverUrl = url;
  }

  public get apiKey() {
    return this._apiKey;
  }

  public set apiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  public get apiHeaders() {
    return {
      apiKey: this.apiKey,
    };
  }
}
