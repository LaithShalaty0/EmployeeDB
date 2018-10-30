import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  disableSalary = true;

  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    phone: 0,
    salary: 0
  };

  constructor(public flashMessages: FlashMessagesService, public router: Router, public employeeService: EmployeeService) { }

  ngOnInit() {
    this.flashMessages.show('Hello From NgOnInit', { cssClass: 'alert-danger', timeout: 6000 });
  }

  onSubmit({value, valid}: {value: Employee, valid: boolean}) {
    

    if (this.disableSalary) {
      value.salary = 0;
    }

    if (!valid) {
      this.flashMessages.show('Please Write Correct Info', { cssClass: 'alert-danger', timeout: 6000 });
      this.router.navigate(['add-employee']);
    } else {
      this.flashMessages.show('New Employee Added Successfully!', { cssClass: 'alert-success', timeout: 6000 });
      this.employeeService.addEmployee(value);
      this.router.navigate(['']);
    }
  }

}
