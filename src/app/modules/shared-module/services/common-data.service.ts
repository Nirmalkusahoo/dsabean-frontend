import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  private applicationName!:string;
  constructor() {
  }

  public setApplicationName(name:string): void {
    this.applicationName=name
  }
  public getApplicationName(): string {
    return this.applicationName;
  }
}
