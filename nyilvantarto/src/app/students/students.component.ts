import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { Student } from '../student';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  students = [];

  constructor(private router: Router, server: ServerService) {
    server.getStudents().then(storedStudents => {
      if (!Array.isArray(storedStudents)) alert(`Hiba a tanulók lekérésekor.\n${storedStudents}`);
      storedStudents.forEach(student => {
        this.students.push(student);
      });
    });
   }

  ngOnInit(): void {
  }

  public countZeroBalance(): number {
    return this.students.filter(student => student.balance == 0).length;
  }

  public countPlusBalance(): number {
    return this.students.filter(student => student.balance > 0).length;
  }

  public countMinusBalance(): number {
    return this.students.filter(student => student.balance < 0).length;
  }

  public deleteStudent(index: number): void {
    if (confirm(`Biztos törlöd ${this.students[index].name} nevű tanulót és adatait a rendszerből?`)) {
      this.students.splice(index, 1);
    }
  }

}
