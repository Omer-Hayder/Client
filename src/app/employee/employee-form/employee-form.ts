import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../_services/employee';
import { DepartmentService } from '../../_services/department-service';
import { DepartmentDto } from '../../_models/department-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  private employeeService = inject(Employee);
  private departmentService = inject(DepartmentService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  departmentList = signal<DepartmentDto[]>([]);

  constructor() {
    console.log("Hello from constructor");
  }

  ngOnInit(): void {
    this.loadDepartments();
  }


  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    departmentId: [null, [Validators.required, Validators.min(1)]],
    salary: [0, Validators.required],
    projectIds: this.fb.array([])
  });

  get ef() { return this.employeeForm.controls }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => { this.departmentList.set(response) },
      error: (error) => { console.log(error); }
    })
  }

  save() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.createEmployee(this.employeeForm.value)
      .subscribe({
        next: (response) => {
          this.employeeForm.reset();
          this.toastr.success("Employee Saved Successfully!", "Create Employee");
        },
        error: (error) => { console.log(error) }
      })
  }
}
