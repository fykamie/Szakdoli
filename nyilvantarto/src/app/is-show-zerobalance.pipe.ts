import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student';

@Pipe({
  name: 'isShowZerobalance'
})
export class IsShowZerobalancePipe implements PipeTransform {

  transform(students: Student[], isShow: boolean): Student[] {
    if (!students) return [];
    return isShow ?
      students :
      students.filter(student => student.balance != 0);
  }

}
