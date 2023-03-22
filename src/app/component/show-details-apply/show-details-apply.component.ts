import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-show-details-apply',
  templateUrl: './show-details-apply.component.html',
  styleUrls: ['./show-details-apply.component.scss']
})
export class ShowDetailsApplyComponent implements OnInit {

  constructor(private treatmentDetailsService:TreatmentDetailsService,
              private route: ActivatedRoute,
              private myRouter:Router,
              private employeeService: EmployeeService) { }
isClick:boolean=false;
isClickS:boolean=false;
isClickPP:boolean=false;
arrayTreatmentDetails:TreatmentDetails[]= [];
currentNumApply?:number;
currentTreatmentDetails:TreatmentDetails=new TreatmentDetails();
isClickAddTreatment:boolean=false;
currentEmployees:Employee=new Employee();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.currentNumApply=id ;
    });
    this.employeeService.getEmployee().subscribe(empL=>{
      this.currentEmployees=empL;
    },
    err=>{console.log("error")});
    this.treatmentDetailsService.GetAllTreatmentDetails(this.currentNumApply).subscribe(allTreatmentDetails=>{
      this.arrayTreatmentDetails=allTreatmentDetails;
    },
    err=>{console.log("error")}); 
    this.treatmentDetailsService.GetTreatmentDetailsByApplyState(this.currentNumApply).subscribe(newTreatmentDetails=>{
      this.currentTreatmentDetails=newTreatmentDetails;
    },
    err=>{console.log("error")}); 
    
  }
  isClickAddTreatmentF(){
if(this.isClickAddTreatment)
alert("הוספת שלב הטיפול לא הושלמה במלואה") ;

this.isClickAddTreatment=!this.isClickAddTreatment;

}
return () {
  if (this.currentEmployees.job?.id == 1) {
    this.myRouter.navigate(['/manager']);
  }
  else if (this.currentEmployees.job?.id == 3)
    this.myRouter.navigate(['/navigateSecretary']);
  else if (this.currentEmployees.job?.id == 4)
    this.myRouter.navigate(['/inTakeNav']);
    else if (this.currentEmployees.job?.id ==5)
    this.myRouter.navigate(['/navigatePatient']);
}

}
