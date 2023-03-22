import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';




@Component({
  selector: 'app-code-send',
  templateUrl: './code-send.component.html',
  styleUrls: ['./code-send.component.scss']
})
export class CodeSendComponent implements OnInit {
  constructor(private myEmployeeService:EmployeeService,
              private myRouter:Router) { }
  
  email:any=this.myEmployeeService.currentEmployees.email
  one:string=""
  two:string=""
  three:string=""
  four:string=""
  c:number=0;
  verificationCode:string=""

  ngOnInit(): void {
   
  }

  verification(){
    this.verificationCode=""
    this.verificationCode+=this.one+this.two+this.three+this.four;
    console.log("verificationCode:"+this.myEmployeeService.currentEmployees.verificationCode)
    console.log(this.verificationCode)

    if(this.verificationCode==this.myEmployeeService.currentEmployees.verificationCode){
    alert("sucssfull hello "+this.myEmployeeService.currentEmployees.idUserNavigation?.firstName)
    this.myRouter.navigate(['/newPassword']);
  }
  else{
    alert("error")

  }
  }
    keytab(event:any, maxLength:number){
     this.c++;
        let nextInput = event.srcElement.nextElementSibling; // get the sibling element
    
        var target = event.target || event.srcElement;
        var id = target.id
        console.log(id.maxlength); // prints undefined
        if(nextInput == null)  // check the maxLength from here
            return;
        else
            nextInput.focus();   // focus if not null
    
   }
}
