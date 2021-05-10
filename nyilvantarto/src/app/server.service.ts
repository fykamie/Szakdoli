import { Injectable } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _getStudentsURL = "http://localhost:4201/db/students";

  constructor() { }

  public async getStudents() {
    return fetch(this._getStudentsURL).then(response => {
      if (response.ok) {
        return response.json()
      }
      return []
    }).catch(error => error)
  }
}
