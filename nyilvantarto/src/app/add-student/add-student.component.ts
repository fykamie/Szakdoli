import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent implements OnInit {

  public student = new Student();

  constructor(public server: ServerService) { }

  ngOnInit(): void {
  }

  public save(){
    let validation = this.student.getValidation();
    if (validation.isValide) {
      this.server.addStudent(this.student).then(addedStudent => {
        if (addedStudent._id) {
          alert("Sikeres mentés");
          return;
        }
        alert("Nem járt sikerrel, próbálja újra");
        console.log(addedStudent);
      });
    } else {
      alert(validation.validationMsg);
    }
  }

}
