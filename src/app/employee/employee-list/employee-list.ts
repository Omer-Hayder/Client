import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../_services/employee';
import { EmployeeDto } from '../../_models/employee-dto';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  private employeeService = inject(Employee);

  employeeList: EmployeeDto[] = [];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.employeeList = response;
        },
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {
          console.log("Complete.");
        }
      }
    )
  }

}
