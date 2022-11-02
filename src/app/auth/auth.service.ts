import {Injectable} from '@angular/core';
import {HttpService} from "../modules/shared-module/services/http.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RegisterPayload} from "./register/register-payload";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) {

  }

  public registerUser(registerPayload: RegisterPayload): Observable<{}> {
    const url: string = environment.baseUrl + environment.register;
    return this.httpService.postData(url, registerPayload);
  }
}
