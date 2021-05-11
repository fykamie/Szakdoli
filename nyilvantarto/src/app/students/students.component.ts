import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModifyService } from '../modify.service';
import { ServerService } from '../server.service';
import { Student } from '../student';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  public students = [];
  public searchKey = "";
  public isShowMinusBalance = true;
  public isShowZeroBalance = true;
  public isShowPlusBalance = true;


  constructor(private router: Router, public server: ServerService, public modifySV: ModifyService) {
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
      this.server.deleteStudent(this.students[index]._id).then(deleteInfo => {
        if (deleteInfo.message) {
          alert(deleteInfo.message);
          return;
        }
        this.students.splice(index, 1);
      });
    }
  }

}
