import { Component, AfterContentChecked } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterContentChecked {

  Employee = [];

  totalEmployees: number;
  totalEmployeesSalary: number;

  constructor(public employeeService: EmployeeService) {
    this.Employee = this.employeeService.getEmployees();

    this.getTotalEmployees();
  }
  getTotalEmployees() {
    let total = 0;
    let totalSalary = 0;
    for (let i = 0; i < this.Employee.length; i++) {
      total += 1;
      totalSalary += parseFloat(this.Employee[i].salary.toString());
    }
    this.totalEmployees = total;
    this.totalEmployeesSalary = totalSalary;
  }

  ngAfterContentChecked() {
    this.getTotalEmployees()
  }
}
