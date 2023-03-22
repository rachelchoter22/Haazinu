import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  
  
  form!: FormGroup;
  PassToLogin: string ="";
  confirmPassword:string="";
  isValid!:boolean
  emailCurrentEmployees:string="";
  updateEmployees:Employee=new Employee();
  result:any
  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.PassToLogin=""
    this.confirmPassword=""
    this.form = this.formBuilder.group({
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]],
      confirmPasswordV: [null, [Validators.required]],

     });
    
     const togglePassword = document.querySelector("#togglePassword");
     const password = document.querySelector("#password");
     const togglePassword1 = document.querySelector("#togglePassword1");
     const password1 = document.querySelector("#password1");

     togglePassword?.addEventListener('click', function () {
         // toggle the type attribute
         const type = password?.getAttribute("type") === "password" ? "text" : "password";
         password?.setAttribute("type", type);
         
         // toggle the icon
         togglePassword?.classList.toggle("bi-eye");
     });
     togglePassword1?.addEventListener('click', function () {
      // toggle the type attribute
      const type1 = password1?.getAttribute("type") === "password" ? "text" : "password";
      password1?.setAttribute("type", type1);
      
      // toggle the icon
      togglePassword1?.classList.toggle("bi-eye");
  });
     // prevent form submit
    //  const form = document.querySelector("form");
    //  form?.addEventListener('submit', function (e) {
    //      e.preventDefault();
    //  });
     const button = document.getElementById('btn');

     button?.addEventListener('click', function handleClick(event) {
       console.log('button clicked');
       console.log(event);
       console.log(event.target);
     });
     const button1 = document.getElementById('btn1');

     button1?.addEventListener('click', function handleClick(event) {
       console.log('button clicked');
       console.log(event);
       console.log(event.target);
     });
  }
 
  //שינוי סיסמה לפעיל הנוכחי
  Confirm(){
    //שליפת האימייל הנוכחי ועדכון הסיסמה
this.emailCurrentEmployees+= this.employeeService.currentEmployees.email;
this.updateEmployees.email=this.employeeService.currentEmployees.email;
this.updateEmployees.id=this.employeeService.currentEmployees.id;
this.updateEmployees.idUser=this.employeeService.currentEmployees.idUser;
this.updateEmployees.password=this.PassToLogin;
this.updateEmployees.jobId=this.employeeService.currentEmployees.jobId;
this.updateEmployees.verificationCode=this.employeeService.currentEmployees.verificationCode;
//this.updateEmployees.user=this.employeeService.currentEmployees.user;
this.updateEmployees.idUserNavigation=this.employeeService.currentEmployees.idUserNavigation;
this.updateEmployees.job=this.employeeService.currentEmployees.job;

    this.employeeService.UpdateEmployee(this.emailCurrentEmployees,this.updateEmployees).subscribe(result=>{
      this.result=result;
      console.log(this.updateEmployees);
     console.log(this.result);

    },
    err=>{console.log("error")});  

  }
  ConfirmPassword(){
    
    console.log(this.PassToLogin+"_____"+this.confirmPassword)
if(this.PassToLogin!=this.confirmPassword){
    return "הסיסמה אינה תואמת";}
    else if(this.PassToLogin==""&&this.confirmPassword==""){
    return "שדה חובה";}
      else{
      this.isValid=true
    return "saccefull";
    }
  }
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
   validatePassword() {
    
    console.log(this.PassToLogin+"_____"+this.confirmPassword)
    if (this.form.get('confirmPasswordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return  'vvvvvvvvv';
  
   }
 
}
