import { Component, OnInit } from '@angular/core';
import { ModifyService } from '../modify.service';
import { Student } from '../student';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.sass']
})
export class ModifyStudentComponent implements OnInit {
  public student = new Student();

  constructor(private modifySV: ModifyService) {
    this.student = modifySV.student;
  }

  ngOnInit(): void {
  }

  public save(): void {}

}
