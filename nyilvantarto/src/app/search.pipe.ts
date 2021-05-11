import { Pipe, PipeTransform } from '@angular/core';
import { Student } from './student';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(students: Student[], searchtext: string): Student[] {
    if (!students) return [];
    if (!searchtext) return students;
    return students.filter( student => student.name.toUpperCase().includes(searchtext.toUpperCase()));
  }

}
