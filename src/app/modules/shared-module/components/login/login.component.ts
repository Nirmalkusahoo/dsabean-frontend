import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonDataService } from '../../services/common-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ValidateUserModel } from '../../models/sign-up.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../alert/alert.component';
import { AlertInput } from '../alert/alert-input';
import {FormValidatorService} from "../../services/form-validator.service";
import {ErrorCode} from "../../enums/error-code.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hidePassword: boolean = true;
  public showOtp: boolean = false;
  public showLoginButton: boolean = false;

  //strings
  public applicationName!: string;
  // form controls
  public phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  public otp: FormControl = new FormControl('', [Validators.required]);
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonDataService: CommonDataService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    public formValidatorService: FormValidatorService
  ) {
    this.initFormGroup();
    this.applicationName = this.commonDataService.getApplicationName();
  }

  ngOnInit(): void {
    this.formSubscription();
  }

  private formSubscription(): void {
    this.phoneNumber.statusChanges.subscribe((status) => {
      if (status==='INVALID') {
        // this.showOtp = false;
      } else if(status==='VALID') {
        // this.showOtp = false;
      }
    });
  }

  public initFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      phoneNumber: this.phoneNumber,
      otp: this.otp,
    });
  }

  public doOtpCall(): void {
    const number: string = this.userService.getNumberWithAreaCode(
      this.phoneNumber.value
    );
    this.userService.sentOTP(number).subscribe(() => {
      this.showOtp = true;
      this.showLoginButton= true;
      this.showSnackBarMessage(
        'Verification code sent to ' + this.phoneNumber.value
      );
    });
  }

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.userService.validate(this.getLoginData()).subscribe(
        () => {
          this.dialogRef.close('login_successful');
          this.showSnackBarMessage('Logged in successfully');
        },
        (error) => {
          this.showAlert(error.error.errorCode);
        }
      );
    }
  }

  private getLoginData(): ValidateUserModel {
    const loginData: ValidateUserModel = new ValidateUserModel();
    loginData.phoneNumber = this.userService.getNumberWithAreaCode(
      this.phoneNumber.value
    );
    loginData.otp = this.otp.value;
    return loginData;
  }

  private showAlert(code:string): void {
    const alertInput: AlertInput = new AlertInput();
    switch (code){
      case ErrorCode.OTP_MISMATCH:
        alertInput.content = 'One Time Password did not match';
        alertInput.btn2.btnActionMessage = ErrorCode.OTP_MISMATCH;
        break
      default:
        alertInput.content = 'Something went wrong.Please try again';
        alertInput.btn2.btnActionMessage = 'ok';
    }
    alertInput.title = 'Oops !!!';

    alertInput.btn1.btnLevel = 'No Thanks';
    alertInput.btn1.btnActionMessage = 'no_thanks';
    alertInput.btn2.btnLevel = 'Ok';
    const alertDialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: alertInput,
    });

    alertDialogRef.afterClosed().subscribe((message) => {
      switch (message) {
        case ErrorCode.OTP_MISMATCH:
          this.otp.reset();
          this.otp.updateValueAndValidity();
          break;
        case 'no_thanks':
          this.dialogRef.close();
          break;
      }
    });
  }
  public openSignUp(): void {
    this.dialogRef.close('openSignUpForm');
  }

  private showSnackBarMessage(snackBarMessage: string): void {
    this.matSnackBar.open(snackBarMessage, '', {
      duration: 2000,
    });
  }
}
