import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../_services/employee-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmpDetailsDto } from '../../_models/emp-details-dto';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnInit {
  private employeeService = inject(EmployeeService);
  private router = inject(ActivatedRoute);

  employeeId = signal<number>(0);
  employeeDetails = signal<EmpDetailsDto | null>(null);

  ngOnInit(): void {
    this.employeeId.set(Number(this.router.snapshot.paramMap.get('id')));
    this.getById();
  }

  getById() {
    this.employeeService.getEmployeeById(this.employeeId()).subscribe({
      next: response => {
        this.employeeDetails.set(response);
      },
      error: (error) => { console.log(error); }
    })
  }

}
