import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-in-take-nav',
  templateUrl: './in-take-nav.component.html',
  styleUrls: ['./in-take-nav.component.scss']
})
export class InTakeNavComponent implements OnInit {

  constructor(private applyService:ApplyService,
              private employeeService: EmployeeService,
              private myRouter:Router,
              ) { }
  applyList: any;
  nameEmployee:any;
  currentEmplo:Employee=new Employee();
  applyListByStatusAwaitingExecution:any;
  countApply:number=0;
  detailsAnother:string="-";
  isNotEmp:boolean=false;
  zman:string="";
  ngOnInit(): void {
    var d=new Date();
  if(d.getHours()>=6 && d.getHours()<=12)
  this.zman="בוקר טוב לך "
  else
  if( d.getHours()>=12&&new  Date().getHours()<=18)
  this.zman="צהריים טובים לך "
  else
  if(d.getHours()>=18&&d.getHours()<=22)
  this.zman="ערב טוב לך "
  else
  if(d.getHours()>=22&&d.getHours()>24|| d.getHours()>=0&& d.getHours()<=6)
  this.zman="לילה טוב לך ";

    this.employeeService.getEmployee().subscribe(empL=>{
      this.nameEmployee=empL?.idUserNavigation?.firstName;
      this.currentEmplo=empL;
      if(this.currentEmplo.job?.id!=4)
      this.isNotEmp=true;
    },
    err=>{console.log("error")}); 
    this.applyService.GetAllApplyByStatus(6).subscribe(arrayApply=>{
      this.applyList=arrayApply;
      this.countApply=Object.keys(this.applyList).length;

    },
    err=>{console.log("error")});  
    
  }
  fillNewApply(item:any){
    if(item!=null){
      this.myRouter.navigate(['/fillNewApply/'+item.id]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  awaitingExecution(){
    this.myRouter.navigate(['/awaitingExecution']);
  }
  return () {
    if (this.currentEmplo.job?.id == 1) {
      this.myRouter.navigate(['/manager']);
    }
    else if (this.currentEmplo.job?.id == 3)
      this.myRouter.navigate(['/navigateSecretary']);
    else if (this.currentEmplo.job?.id == 4)
      this.myRouter.navigate(['/inTakeNav']);
      else if (this.currentEmplo.job?.id ==5)
      this.myRouter.navigate(['/navigatePatient']);
  }
 newApply(){
  this.myRouter.navigate(['/newApplySecretery']);
}
}
