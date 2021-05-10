import { Injectable } from '@angular/core';
import { error, promise } from 'selenium-webdriver';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _baseStudentURL = "http://localhost:4201/db/students";
  private _addStudentURL = "http://localhost:4201/db/addStudent";

  constructor() { }

  public async getStudents() {
    return fetch(this._baseStudentURL).then(response => {
      if (response.ok) {
        return response.json()
      }
      return []
    }).catch(error => error)
  }

  public async deleteStudent(studentId: string) {
    return fetch( `${this._baseStudentURL}/${studentId}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok) return "Ok";
      return response.json();
    }).catch(error => error)
  }

  public async addStudent(student: Student) {
    return fetch(this._addStudentURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return false
    }).then(addedStudent => addedStudent).
    catch(error => error);
  }
}
