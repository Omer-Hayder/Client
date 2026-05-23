import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { EmployeeForm } from "../features/employee/employee-form/employee-form";
import { EmployeeList } from '../features/employee/employee-list/employee-list';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, FormsModule],
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
