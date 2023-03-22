import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Employee } from 'src/app/Classes/Employee';
import { Jobs } from 'src/app/Classes/Jobs';
import { User } from 'src/app/Classes/User';
import { EmployeeService } from 'src/app/Services/employee.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-system-activity',
  templateUrl: './system-activity.component.html',
  styleUrls: ['./system-activity.component.scss']
})
export class SystemActivityComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private jobsService:JobsService,
    private userService:UserService,
    private employeeService:EmployeeService,
    private snackBar: MatSnackBar) { }
  form!: FormGroup;
newUser:User=new User();
newEmployees:Employee=new Employee();
  isPressNewEmployees:boolean=false;
  isPressDeleteEmployees:boolean=false;
  isPressAddNewDetailsApply:boolean=false;
  arrayJobs:Jobs[]=[];
  employeesList:Employee[]=[];
  titleUpdate:string="";
  isPressUpdateEmployees:boolean=false;
  valueJob:string=""
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] ,
      selectedValueJob: [""],
      firstName: [null, [Validators.required, Validators.pattern("^[a-zA-Z ]{2,15}$")]],
      lastName: [null, [Validators.required, Validators.pattern("^[a-zA-Z ]{2,15}$")]],

     });
     this.jobsService.GetAllJobs().subscribe(allJobs=>{
      this.arrayJobs=allJobs;
    },
    err=>{console.log("error")}); 
    
  }
  getErrorMessageEmail() {
    if (this.form.get('email')?.hasError('required')) {
      return 'שדה חובה-אנא הכנס כתובת אימייל';
    }
    return this.form.get('email')?.hasError('pattern') ? 'כתובת המייל אינה תקינה' : '';
  }
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
  getErrorMessageMobileNumber() {
    if (this.form.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  onSelectedValueJob(){
    console.log(this.form.get('selectedValueJob')?.value);
    debugger
    for (let index = 0; index < this.arrayJobs.length; index++) {
      if(this.arrayJobs[index].details==this.form.get('selectedValueJob')?.value){
       this.newEmployees.jobId=this.arrayJobs[index].id;
        break;
      }
    }
  }
  addNewUser(){
    this.userService.AddUser(this.newUser).subscribe(userEmployees=>{
      debugger
     this.newEmployees.idUser=userEmployees;
     this.eddEmp();
    },
    err=>{console.log("error")});  
  }
  eddEmp(){
    this.employeeService.addEmployees(this.newEmployees).subscribe(employees=>{
      this.newEmployees.id=employees;
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.horizontalPosition = 'center';
      config.duration = 1400;
      config.direction='rtl'
      this.snackBar.open(this.newUser.firstName+"  "+this.newUser.lastName+" נוסף בהצלחה", 'הסר',config);
      this.isPressNewEmployees=!this.isPressNewEmployees;
     },
     err=>{console.log("error")});
  }
  addEmployees(){
    this.addNewUser();
  }
  GetAllEmployees(){    
    this.isPressDeleteEmployees=true
    this.employeeService.GetAllEmployees().subscribe(emp => { 
            this.employeesList = emp;
        },    err=>{console.log("error")});
    }
    deleteEmployees(item:any){
this.employeeService.deleteEmployees(item.id).subscribe(emp => { 
  this.isPressDeleteEmployees=false;
},    err=>{console.log("error")});
    }
    updateEmployees(item:any){
      
      this.titleUpdate=" עדכון עובד מספר "+item.id+"בשם: "+item.idUserNavigation?.lastName+" "+item.idUserNavigation?.firstName;
      this.isPressUpdateEmployees=true;
      this.isPressDeleteEmployees=false;
      this.isPressNewEmployees=false;
      this.isPressAddNewDetailsApply=false;
      this.newUser=item.idUserNavigation;
      this.valueJob=item.job.details;
      this.newEmployees=item;
    }
    updateEmployeesI(){
      this.updateUser();
    }
    updateUser(){
      this.newUser.id=this.newEmployees.idUser;
this.userService.UpdateUser(this.newUser.id,this.newUser).subscribe(emp => { 
  this.updateEMployees();
 },    err=>{console.log("error")}); 
    }
    updateEMployees(){
  this.employeeService.UpdateEmployee(this.newEmployees.id,this.newEmployees).subscribe(emp => { 
    this.isPressUpdateEmployees=!this.isPressUpdateEmployees;
 },    err=>{console.log("error")});
    }
}
