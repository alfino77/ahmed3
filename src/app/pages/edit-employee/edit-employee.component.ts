import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {


  genderValue: any[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
  ];

  
  roleValue: any[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Customer', viewValue: 'Customer'},
  ];

  employeeEditForm!:FormGroup;
  constructor(private router:Router,
    private employeeService:EmployeeService,
    private route:ActivatedRoute){}
  ngOnInit(): void {
    this.configureEmployeeForm();

    this.route.params.subscribe((paramValues:any)=>{
      
      const emp = paramValues.empID;
      this.fetchById(emp);
      
    })
  }

  configureEmployeeForm(){
    this.employeeEditForm = new FormGroup({
      id:new FormControl(),
      firstName:new FormControl(null,Validators.required),
      lastName:new FormControl(null,Validators.required),
      phoneNumber:new FormControl(null),
      city:new FormControl(null,Validators.required),
      gender:new FormControl(null,Validators.required),
      role:new FormControl(null,Validators.required),
    })
  }

  fetchById(id:any){
    // console.log("dio mimi =>",id);

    this.employeeService.getById(id).subscribe((resp:any)=>{
      // console.log(resp);

      Object.keys(resp).forEach(key=>{
        if(this.employeeEditForm.value.hasOwnProperty(key)){
          this.employeeEditForm.get(key)?.setValue(resp[key]);
          // this.employeeEditForm.get('firstName')?.setValue(resp.fistName);
        }
      })
      
    })
    
  }

  onSave(){
    const id = this.employeeEditForm.value.id;
    const values = this.employeeEditForm.value;

    this.employeeService.editEmp(id,values).subscribe((response:any)=>{
      this.alert();
      this.router.navigateByUrl("employee");
    })
    
  }

  alert(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Edited successfully'
    })
  }


}
