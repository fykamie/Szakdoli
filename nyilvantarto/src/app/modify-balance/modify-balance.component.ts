import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-modify-balance',
  templateUrl: './modify-balance.component.html',
  styleUrls: ['./modify-balance.component.sass']
})
export class ModifyBalanceComponent implements OnInit {
  @Input() student: Student;

  public oweAmount: number;
  public payment: number;

  constructor() {
    this.oweAmount = 0;
    this.payment = 0;
  }

  ngOnInit(): void {
  }

  public save() {
    if (!this.oweAmount && !this.payment) {
      alert("Nincs megadva sem a tartozás, sem a fizetség!");
      return;
    }
    if (this.oweAmount) {
      this.student.balance -= this.oweAmount;
    }
    if (this.payment) {
      this.student.balance += this.payment;
    }
  }

}
