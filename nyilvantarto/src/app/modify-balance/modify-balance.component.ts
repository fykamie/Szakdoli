import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ServerService } from '../server.service';
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

  constructor(public server: ServerService) {
    this.oweAmount = 0;
    this.payment = 0;
  }

  ngOnInit(): void {
  }

  public async save() {
    if (!this.oweAmount && !this.payment) {
      alert("Nincs megadva sem a tartozás, sem a fizetség!");
      return;
    }
    if (this.oweAmount) {
      await this.server.addOweTo(this.student._id, this.oweAmount).then(newBalance => {
        if (newBalance.message) {
          alert(newBalance.message);
          return;
        }
        alert("Sikeresen elkönyvelt tartozás!");
        this.student.balance = newBalance;
      })
    }
    if (this.payment) {
      await this.server.addPaymentTo(this.student._id, this.payment).then(newBalance => {
        if (newBalance.message) {
          alert(newBalance.message);
          return;
        }
        alert("Sikeres fizetés!");
        this.student.balance = newBalance;
      });
    }
  }

}
