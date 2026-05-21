import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../_services/employee-service';
import { EmployeeDto } from '../../_models/employee-dto';
import { RouterLink } from "@angular/router";
import { EmployeeForm } from "../employee-form/employee-form";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink, EmployeeForm],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  modalRef?: BsModalRef;
  private modalService = inject(BsModalService);
  private employeeService = inject(EmployeeService);

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

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(event: any) {
    this.modalRef?.hide();
  }

}
