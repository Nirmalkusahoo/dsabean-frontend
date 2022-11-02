export class AlertInput {
  public title!: string;
  public content!: string;
  public btn1: AlertButtonDetail = new AlertButtonDetail();
  public btn2: AlertButtonDetail = new AlertButtonDetail();
  constructor() {
    this.btn1.btnLevel = 'Ok';
    this.btn1.btnActionMessage = 'Ok';
  }
}

export class AlertButtonDetail {
  public btnLevel!: string;
  public btnActionMessage!: string;
  constructor() {}
}
