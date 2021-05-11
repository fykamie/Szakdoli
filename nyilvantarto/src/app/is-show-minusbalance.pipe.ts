import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student';

@Pipe({
  name: 'isShowMinusbalance'
})
export class IsShowMinusbalancePipe implements PipeTransform {

  transform(students: Student[], isShow: boolean): Student[] {
    if (!students) return []
    return isShow ?
      students :
      students.filter(student => student.balance >= 0 );
  }

}
