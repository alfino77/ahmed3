import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  empAPI:string = environment.allAPI  + "employee/"
  constructor(private http:HttpClient) { }


  getAllEmp(){
    return this.http.get(this.empAPI);
  }

  addEmployee(body:any){
    return this.http.post(this.empAPI,body);
  }

  deleteEmp(id:any){
    return this.http.delete(this.empAPI+id);
  }

  editEmp(id:any,body:any){
    return this.http.put(this.empAPI+id,body)
  }

  getById(id:any){
    return this.http.get(this.empAPI+id);
  }
}
