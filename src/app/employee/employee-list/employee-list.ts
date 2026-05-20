import { Component, inject, OnInit, signal } from '@angular/core';
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

  employeeList = signal<EmployeeDto[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.employeeService.getEmployees().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.employeeList.set(response);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.log(error.error);
          this.isLoading.set(false);
        }
      }
    )
  }

}
