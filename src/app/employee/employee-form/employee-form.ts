import { JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Employee } from '../../_services/employee';
import { DepartmentService } from '../../_services/department-service';
import { DepartmentDto } from '../../_models/department-dto';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../_services/project-service';
import { ProjectDto } from '../../_models/project-dto';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './employee-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {
  private employeeService = inject(Employee);
  private departmentService = inject(DepartmentService);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  departmentList = signal<DepartmentDto[]>([]);
  projectList = signal<ProjectDto[]>([]);
  employeeForm!: FormGroup;

  constructor() {
    console.log("Hello from constructor");
    effect(() => {
      this.initEmployeeForm();
      this.buildCheckBoxes();
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadProjects();
  }

  initEmployeeForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      departmentId: [null, [Validators.required, Validators.min(1)]],
      salary: [0, Validators.required],
      projectIds: this.fb.array<number>([], [minSelectedCheckbox(1)])
    });
  }

  get ef() { return this.employeeForm.controls }
  get itemsFromArray(): FormArray { return this.employeeForm.get('projectIds') as FormArray; }


  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => { this.departmentList.set(response) },
      error: (error) => { console.log(error); }
    })
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projectList.set(response);
      },
      error: (error) => { console.log(error); }
    })
  }

  buildCheckBoxes() {
    const options = this.projectList();
    this.itemsFromArray.clear;
    options.forEach(() => {
      this.itemsFromArray.push(new FormControl(false))
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

export function minSelectedCheckbox(min: number): ValidatorFn {
  return (control: AbstractControl) => {
    const formArray = control as FormArray;

    const totalSelected = formArray.controls.map(c => c.value)
      .reduce((total, current) => current ? total + 1 : total, 0)

    return totalSelected >= min ? null : { require: true }
  }
}