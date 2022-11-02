export class RegisterPayload {
  userName!: string;
  password!: string;
  confirmPassword!: string;
  email: string | undefined;

  constructor() {
  }
}
