import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student';

@Pipe({
  name: 'isShowPlusbalance'
})
export class IsShowPlusbalancePipe implements PipeTransform {

  transform(students: Student[], isShow: boolean): Student[] {
    if(!students) return [];
    return isShow ?
      students :
      students.filter(student => student.balance <= 0);
  }

}
