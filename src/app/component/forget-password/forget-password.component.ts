import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private myActiveRout:ActivatedRoute,
              private myEmployeeService:EmployeeService,
              private myRouter:Router) { }
email:string=""
succedSend:any
  ngOnInit(): void {

    this.myActiveRout.params.subscribe
    (
      data=>{
        this.email = data["currentEmployeesEmail"]
       console.log(this.email)
        } 
    )
   
  }
  
  
sendCode(){

  // this.myEmployeeService.UpdateEmployeeCode(this.myEmployeeService.currentEmployees).subscribe(emp=>{
  //   this.succedSend=emp
  //   console.log(this.succedSend);
  // },
  // err=>{console.log("error")});
  this.myRouter.navigate(['/codeSend']);
}

}
