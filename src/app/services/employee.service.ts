import { Injectable } from '@angular/core';
import { Employee } from '../employee';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: AngularFireList<any>
  Employee = [];
  fireEmployee: AngularFireObject<Employee[]>;

  constructor(public af: AngularFireDatabase) {
    this.employees = af.list('/employees/employees')

    this.employees.snapshotChanges().subscribe(employees => {

      employees.forEach(employee => {
        let y = employee.payload.toJSON()
        y['$key'] = employee.key
        this.Employee.push(y as Employee)
      })
    })
  }

  getEmployees() {
    return this.Employee;
  }

  getEmployee(id: string) {
    this.fireEmployee = this.af.object('/employees/employees/' + id) as AngularFireObject<Employee[]>;
    return this.fireEmployee;
  }

  addEmployee(employee: Employee) {
    this.Employee = [];
    return this.employees.push(employee);
  }
}
