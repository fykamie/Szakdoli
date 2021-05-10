import { Injectable } from '@angular/core';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ModifyService {
  public student = new Student();

  constructor() { }
}
