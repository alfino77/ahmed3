import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  
  genderValue: any[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
  ];

  
  roleValue: any[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Customer', viewValue: 'Customer'},
  ];

  employeeForm!:FormGroup;
  constructor(private router:Router,
    private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.configureEmployeeForm();
  }

  configureEmployeeForm(){
    this.employeeForm = new FormGroup({
      firstName:new FormControl(null,Validators.required),
      lastName:new FormControl(null,Validators.required),
      phoneNumber:new FormControl(null),
      city:new FormControl(null,Validators.required),
      gender:new FormControl(null,Validators.required),
      role:new FormControl(null,Validators.required),
    })
  }

  onSave(){
    const values = this.employeeForm.value;
    console.log(values);

    this.employeeService.addEmployee(values).subscribe((resp:any)=>{
      this.router.navigateByUrl("employee");
    })
    
  }

}
