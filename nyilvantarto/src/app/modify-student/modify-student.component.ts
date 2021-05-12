import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { ModifyService } from '../modify.service';
import { ServerService } from '../server.service';
import { Student } from '../student';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.sass']
})
export class ModifyStudentComponent implements OnInit {
  public student = new Student();

  constructor(private server: ServerService, private modifySV: ModifyService, public loadingSV: LoadingService) {
    this.student = modifySV.student
  }

  ngOnInit(): void {
  }

  public async save() {
    let validation = this.getValidation();

    if (validation.isValide) {
      this.loadingSV.isLoading = true;
      await this.server.modifyStudent(this.student).then(modifiedStudentInfo => {
        if (modifiedStudentInfo.message) {
          alert(modifiedStudentInfo.message);
          return;
        }
        alert("Sikeres mentés");
      });
      this.loadingSV.isLoading = false;
    } else {
      alert(validation.validationMsg);
    }
  }

  private getValidation () {
    if (!this.student.name) return {isValide: false, validationMsg: "Hiányzó név"};
    if (!this.student.hourfee) return {isValide: false, validationMsg: "Hiányzó óradíj"};
    if (!Number(this.student.hourfee) || this.student.hourfee < 1) return {isValide: false, validationMsg: "Nem megfelelő formátumú óradíj"};
    return {isValide: true, validationMsg: ""}
}

}
