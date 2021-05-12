import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';
import { ServerService } from '../server.service';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent implements OnInit {

  public student = new Student();

  constructor(public server: ServerService, public loadingSV: LoadingService) { }

  ngOnInit(): void {
  }

  public async save(){
    let validation = this.student.getValidation();
    if (validation.isValide) {
      this.loadingSV.isLoading = true;
      await this.server.addStudent(this.student).then(addedStudent => {
        if (addedStudent._id) {
          alert("Sikeres mentés");
          return;
        }
        alert("Nem járt sikerrel, próbálja újra");
        console.log(addedStudent);
      });
      this.loadingSV.isLoading = false;
    } else {
      alert(validation.validationMsg);
    }
  }

}
