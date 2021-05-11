import { Injectable } from '@angular/core';
import { error, promise } from 'selenium-webdriver';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _baseStudentURL = "http://localhost:4201/db/students";
  private _addStudentURL = "http://localhost:4201/db/addStudent";
  private _addPaymentURL = "http://localhost:4201/db/students/addPayment";
  private _addOweURL = "http://localhost:4201/db/students/addAppearance";

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

  public async modifyStudent(student) {
    return fetch( `${this._baseStudentURL}/${student._id}`, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    }).then(response => response.json()).
    catch(error => error);
  }

  public async addPaymentTo(studentId: string, amount: number) {

    return fetch(`${this._addPaymentURL}/${studentId}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({payment: amount})
    }).then(response => response.json()).
    catch(error => error);
  }

  public async addOweTo(studentId: string, amount: number) {

    return fetch(`${this._addOweURL}/${studentId}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({owe: amount})
    }).then(response => response.json()).
    catch(error => error);
  }
}
