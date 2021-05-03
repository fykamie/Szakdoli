import { Component, OnInit } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  students = [];

  constructor() {
    this.mockStudents();
    
   }

  ngOnInit(): void {
  }

  private async mockStudents(): Promise<void> {
    for (let index = 0; index < 20; index++) {
      let tmpStudent = new Student();
      tmpStudent.name = `${this.getRandomWord(2)} ${this.getRandomWord(2)}`;
      tmpStudent.hourfee = Math.floor(Math.random()*1500 + 500);
      tmpStudent.balance = 2000 - Math.floor(Math.random()*3000);
      this.students.push(tmpStudent);
    }
  }

  private getRandomWord(wordLength: number): string {
    const vowels = "aáeéiíoóöőuúüű";
    const cons = "bcdfghjklmnpqrstvwxyz";
    let word = "";
    let rand = Math.floor(Math.random() * 10);
    word = rand % 2 ? 
      cons.charAt(Math.floor(Math.random() * cons.length)).toUpperCase() :
      vowels.charAt(Math.floor(Math.random() * vowels.length)).toUpperCase();

    for (let index = 0; index < wordLength-1/2; index++) {
      word += cons.charAt(Math.floor(Math.random() * cons.length));
      word += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }

    return word
  }

}
