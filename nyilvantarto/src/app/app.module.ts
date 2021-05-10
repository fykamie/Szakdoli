import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule } from '@angular/forms';
import { DigitOnlyDirective } from './digit-only.directive';
import { ModifyStudentComponent } from './modify-student/modify-student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AddStudentComponent,
    DigitOnlyDirective,
    ModifyStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
