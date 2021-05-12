import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { ModifyService } from '../modify.service';
import { ServerService } from '../server.service';

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


  constructor(public server: ServerService, public modifySV: ModifyService, public loadingSV: LoadingService) {
    this.getStudents();
   }

  ngOnInit(): void {
  }

  private async getStudents() {
    this.loadingSV.isLoading = true;
    await this.server.getStudents().then(storedStudents => {
      if (!Array.isArray(storedStudents)) alert(`Hiba a tanulók lekérésekor.\n${storedStudents}`);
      storedStudents.forEach(student => {
        this.students.push(student);
      });
    });
    this.loadingSV.isLoading = false;
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

  public async deleteStudent(index: number) {
    if (confirm(`Biztos törlöd ${this.students[index].name} nevű tanulót és adatait a rendszerből?`)) {
      this.loadingSV.isLoading = true;
      await this.server.deleteStudent(this.students[index]._id).then(deleteInfo => {
        if (deleteInfo.message) {
          alert(deleteInfo.message);
          return;
        }
        this.students.splice(index, 1);
      });
      this.loadingSV.isLoading = false;
    }
  }

}
