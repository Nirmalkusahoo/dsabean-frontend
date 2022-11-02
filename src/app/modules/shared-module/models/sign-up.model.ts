export class SignUpModel {
  constructor() {}
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public password!: string;
}

export class ValidateUserModel {
  constructor() {}
  public phoneNumber!: string;
  public otp!: string;
}
