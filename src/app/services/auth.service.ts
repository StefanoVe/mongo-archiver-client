import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const LS_URL = 'serverUrl';
export const LS_API_KEY = 'apiKey';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _serverUrl = '';
  private _apiKey = '';

  constructor() {
    this._bootstrap();
  }

  private _bootstrap() {
    this._serverUrl = localStorage.getItem(this._lsPrefix(LS_URL)) || '';
    this._apiKey = localStorage.getItem(this._lsPrefix(LS_API_KEY)) || '';

    if (!this._serverUrl || !this._apiKey) {
      return;
    }

    if (!this._serverUrl.endsWith('/')) {
      this._serverUrl += '/';
    }

    if (!this._serverUrl.startsWith('http')) {
      this._serverUrl = `http://${this._serverUrl}`;
    }
  }

  public get serverUrl() {
    return this._serverUrl;
  }

  public set serverUrl(url: string) {
    localStorage.setItem(this._lsPrefix(LS_URL), url);
    this._serverUrl = url;
  }

  public get apiKey() {
    return this._apiKey;
  }

  public set apiKey(apiKey: string) {
    localStorage.setItem(this._lsPrefix(LS_API_KEY), apiKey);
    this._apiKey = apiKey;
  }

  public get apiHeaders() {
    return {
      headers: {
        'x-api-key': this.apiKey,
      },
    };
  }

  public signOut() {
    localStorage.removeItem(this._lsPrefix(LS_URL));
    localStorage.removeItem(this._lsPrefix(LS_API_KEY));

    window.location.reload();
  }

  private _lsPrefix(key: string) {
    return `${environment.lsPrefix}${key}`;
  }
}
