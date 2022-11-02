import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RegisterPayload} from "./register-payload";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public username: FormControl = new FormControl<string>('')
  public email: FormControl = new FormControl<string>('')
  public password: FormControl = new FormControl<string>('')
  public confirmPassword: FormControl = new FormControl<string>('')

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    })
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const registerPayLoad: RegisterPayload = new RegisterPayload();
    registerPayLoad.userName = this.username.value;
    registerPayLoad.email = this.email.value;
    registerPayLoad.password = this.password.value;

    this.authService.registerUser(registerPayLoad).subscribe((data) => {
      console.log("User registered")
    })
  }
}
