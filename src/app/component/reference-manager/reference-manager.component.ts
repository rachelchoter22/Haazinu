import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-reference-manager',
  templateUrl: './reference-manager.component.html',
  styleUrls: ['./reference-manager.component.scss']
})
export class ReferenceManagerComponent implements OnInit {

  constructor(private applyService:ApplyService,
    private myRouter: Router,
    private treatmentDetailsService:TreatmentDetailsService,
    private employeeService: EmployeeService,) { }
  applyListFromIntake: any;
  isOkFromIntake:boolean=false;
  isClickAwait:boolean=false;
  isClickAllApply:boolean=false;
  countApply:number=0;
  countApplyAwait:number=0;
currentEmployees:Employee=new Employee();
applyList:Apply[]=[];
listTreatmentDetails:TreatmentDetails[]=[];
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

this.newFromIntake();
  }
  newFromIntake(){
    this.applyService.GetAllApplyByStatus(2).subscribe(arrayApply=>{
      
      this.applyListFromIntake=arrayApply;
      this.countApply=Object.keys(this.applyListFromIntake).length;
    },
    err=>{console.log("error")});  
    this.employeeService.getEmployee().subscribe(empL=>{
      this.currentEmployees=empL;
      this.getApplyByEmpStatus();
    },
    err=>{console.log("error")}); 
  }
  sivoug(id:any){
    this.myRouter.navigate(['/newTratmentDetailsManager/' + id]);

  }
  getApplyByEmpStatus(){

    this.applyService.getAllAppliesByStatusEmailTerapist(this.currentEmployees.id,3).subscribe(arrayApply=>{
      this.applyList=arrayApply;
      this.getAllTraetmentDetails(this.applyList);
    },
    err=>{console.log("error")});
  }
  getAllTraetmentDetails(arrApply:any){
    for(let i=0; i<arrApply.length;i++){
      this.addTreatment(arrApply[i].id);
    }
  }
  addTreatment(id:any){
    this.treatmentDetailsService.GetTreatmentDetailsByApplyState(id).subscribe(newTreatmentDetails=>{
    this.listTreatmentDetails.push(newTreatmentDetails);
    this.countApplyAwait+=1;
    },
    err=>{console.log("error")}); 
  }
  addTreatmentDetails(item:any){
    if(item!=null){
      this.myRouter.navigate(['/showDetailsApply/'+item.applyId]);
    }
    else alert("לחצתם על פניה לא קיימת")

  }
  inTake() {
    this.myRouter.navigate(['/inTakeNav']);
  }
  newApply() {
    this.myRouter.navigate(['/newApplySecretery']);
  }
  systemActivity(){
   
    this.myRouter.navigate(['/manager/systemActivity']);

  }
  awaitingClassificationC(){
    this.myRouter.navigate(['/manager/awaitingClassificationC']);
  }
  allApplyManager(){
    this.myRouter.navigate(['/manager/allApplyManager']);
  }
  statusApplyManager(){
    this.myRouter.navigate(['/manager/statusApplyManager']);
  }
 awaitingExecution(){
    this.myRouter.navigate(['/manager/awaitingExecution']);
  }
  
}
