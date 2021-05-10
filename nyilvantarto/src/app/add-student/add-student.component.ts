import { Component, OnInit } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass']
})
export class AddStudentComponent implements OnInit {

  public student = new Student();

  constructor() { }

  ngOnInit(): void {
  }

  public save(){
  }

}
