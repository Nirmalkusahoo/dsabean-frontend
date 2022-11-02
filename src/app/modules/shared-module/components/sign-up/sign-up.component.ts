import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidatorService } from '../../services/form-validator.service';
import { SignUpModel } from '../../models/sign-up.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public reCaptchaVerifier: any;

  //strings
  public hidePassword: boolean = true;

  // booleans
  public showContinueBtn: boolean = true;
  public showSignupDetails: boolean = false;
  // form controls
  public phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  public email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public firstName: FormControl = new FormControl('', [Validators.required]);
  public lastName: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public otp: FormControl = new FormControl('', [Validators.required]);
  public signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private matSnackBar: MatSnackBar,
    public formValidatorService: FormValidatorService,
    public userService: UserService
  ) {
    this.initFormGroup();
  }

  ngOnInit() {
  }
  public initFormGroup(): void {
    this.signUpForm = this.formBuilder.group({
      phoneNumber: this.phoneNumber,
      email: this.email,
      otp: this.otp,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
    });
  }

  public sendOtp(): void {
    this.phoneNumber.markAsTouched();
    this.email.markAsTouched();
    if (this.phoneNumber.valid && this.email.valid) {
      this.doOtpCall();
      this.showContinueBtn = false;
      this.showSignupDetails = true;
      this.phoneNumber.disable();
      this.email.disable();
    }
  }

  public doOtpCall(): void {
    const number: string = this.userService.getNumberWithAreaCode(
      this.phoneNumber.value
    );
    this.userService.sentOTP(number).subscribe(() => {
      this.showSnackBarMessage(
        'Verification code sent to ' + this.phoneNumber.value
      );
    });
  }
  public onSubmit(): void {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.createUserAccount();
    }
  }

  private createUserAccount(): void {
    const signUpData: SignUpModel = new SignUpModel();
    signUpData.phoneNumber = this.userService.getNumberWithAreaCode(
      this.phoneNumber.value
    );
    signUpData.email = this.email.value;
    signUpData.password = this.password.value;
    signUpData.firstName = this.firstName.value;
    signUpData.lastName = this.lastName.value;
    this.userService.createUserAccount(signUpData).subscribe((response) => {
      this.showSnackBarMessage('Account created successfully');
      this.dialogRef.close('account_creation_successful');
    });
  }
  private showSnackBarMessage(snackBarMessage: string): void {
    this.matSnackBar.open(snackBarMessage, '', {
      duration: 2000,
    });
  }

  public showLoginForm(): void {
    this.dialogRef.close('openLoginForm');
  }
}
