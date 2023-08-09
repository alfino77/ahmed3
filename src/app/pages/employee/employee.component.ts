import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private router:Router,
    private employeeService:EmployeeService){}
  ngOnInit(): void {
    
    this.fetchAll();
  }

  listEmp:any;
  fetchAll(){
    this.employeeService.getAllEmp().subscribe((response:any)=>{
      
      this.listEmp = response;
      console.log(this.listEmp);
      
    })
  }

  onAdd(){
    this.router.navigateByUrl("add-employee")
  }

  onDelete(list:any){
    console.log(list.id);

    this.employeeService.deleteEmp(list.id).subscribe((resp:any)=>{
      this.alert();
      this.ngOnInit();
    })
    
  }

  onEdit(list:any){
    this.router.navigateByUrl("/edit-employee/"+ list.id)
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
      icon: 'error',
      title: 'Deleted successfully'
    })
  }


}
