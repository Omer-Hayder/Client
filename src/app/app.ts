import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeForm } from "./employee/employee-form/employee-form";
import { EmployeeList } from './employee/employee-list/employee-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, EmployeeForm, EmployeeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Client');

  name: string = "Ahmed";

  imgSource: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  width: number = 100;

  isDisabled: boolean = false;
  color: string = "green";
  fontColor = "white";

  active: boolean = false;
  buttonStyle = { backgroundColor: 'red', color: 'white' };

  change() {
    this.name = "Mohamed";
    console.log(this.name);
  }

}
