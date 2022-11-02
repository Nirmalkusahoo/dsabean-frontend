import { Injectable } from '@angular/core';
import { ValidateUserModel, SignUpModel } from '../models/sign-up.model';
import { environment } from '../../../../environments/environment';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public httpService: HttpService,
    private tokenService: TokenService
  ) {}



  public sentOTP(userId: string): Observable<{}> {
    const otpData = { loginId: userId };
    const url: string = environment.baseUrl + environment.login;
    return this.httpService.postData(url, otpData);
  }

  public validate(logInData: ValidateUserModel): Observable<any> {
    const url: string = environment.baseUrl + environment.validate;
    return this.httpService.postData(url, logInData).pipe(
      map((response) => {
        if(response?.access_token){
          this.tokenService.setAccessToken(response?.access_token)
        }
      })
    );
  }

  public getNumberWithAreaCode(number: string): string {
    return '+91-' + number;
  }
}
