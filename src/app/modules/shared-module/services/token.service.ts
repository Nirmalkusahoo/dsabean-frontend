import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessToken!:string;
  constructor() { }

  public setAccessToken(accessToken:string): void {
    this.accessToken = accessToken;
    localStorage.setItem('token', accessToken);
  }

  public getAccessToken():string{
    return <string>localStorage.getItem('token');
  }
}
