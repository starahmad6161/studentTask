import { Student } from './core/interfaces/student';
import { DbService } from './core/services/db.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'studentTask';
  studentForm:FormGroup;
  studentList:Array<Student>;
  popupIsActive:boolean = false;

  constructor(private _DbService:DbService, private fb:FormBuilder) {
    this.studentForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      birthday: ["", [Validators.required, Validators.pattern('^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$') ]]
    });

    this.loadStudents();
  }

  loadStudents() {
    this.studentList = this._DbService.getStudent();
  }

  trackBy(index, student:Student) {
    return student.id;
  }

  get name() {
    return this.studentForm.get("name");
  }
  get email() {
    return this.studentForm.get("email");
  }
  get phoneNumber() {
    return this.studentForm.get("phoneNumber");
  }
  get birthday() {
    return this.studentForm.get("birthday");
  }


  addNewStudent() {
    if (this.studentForm.valid) {
      let studentInfo = {
        id: Math.ceil(Math.random() * 999999999),
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        birthday: this.birthday.value,
      }
      this._DbService.addNewStudent(studentInfo);
      this.loadStudents();
      this.studentForm.reset();
      this.popupIsActive = false;
    }
  }
}
