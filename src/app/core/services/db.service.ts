import { Student } from './../interfaces/student';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  demoStudents:Array<Student> = [
    {
      id: 1,
      name: "Ahmed",
      email: "a@a.com",
      phoneNumber: "01145486238",
      birthday: "29/11/1994"
    }
  ]
  constructor() { }


  getStudent() {
    if (this.studentsIsExists()) {
      return JSON.parse(localStorage.getItem("students"));
    } else {
      this.addToLocalStorage(this.demoStudents);
      return this.getStudent();
    }
  }

  addToLocalStorage(studentList) {
    localStorage.setItem("students", JSON.stringify(studentList));
  }


  studentsIsExists() {
    return JSON.parse(localStorage.getItem("students")) ? true : false;
  }

  addNewStudent(userInfo) {
    console.log(userInfo);
    let studentList:Array<Student> = this.getStudent();
    studentList.push(userInfo);
    this.addToLocalStorage(studentList);
  }


}
