import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../_services/employee';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  private employeeService = inject(Employee);

  constructor() {
    console.log("Hello from constructor");
  }
  ngOnInit(): void {
    console.log("Hello from Init");
  }

  employee: any = {
    name: "",
    departmentId: 0,
    salary: 0,
    projectIds: [1]
  };

  save() {
    console.log(this.employee);

    this.employeeService.createEmployee(this.employee)
      .subscribe({
        next: (response) => {
          console.log("Employee Created", response);
        },
        error: (error) => { console.log(error) }
      })
  }
}
