import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-modify-balance',
  templateUrl: './modify-balance.component.html',
  styleUrls: ['./modify-balance.component.sass']
})
export class ModifyBalanceComponent implements OnInit {
  @Input() student: Student

  constructor() { }

  ngOnInit(): void {
  }

  public save() {}

}
