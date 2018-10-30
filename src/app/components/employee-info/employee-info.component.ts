import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../employee';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  id: string;
  employee: Employee[];
  hasSalary: boolean;
  updateSalary: boolean;

  constructor(public employeeService: EmployeeService, public router: Router, public activatedRoute: ActivatedRoute, public flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).valueChanges().subscribe(employee => {
      if (employee["salary"] > 0) {
        this.hasSalary = true;
      }
      this.employee = employee;
      console.log(this.employee['firstName']);
    });
  }

}
