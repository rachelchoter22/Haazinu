import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { EducationalInstitutionsApplicant } from 'src/app/Classes/EducationalInstitutionsApplicant';
import { Employee } from 'src/app/Classes/Employee';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
import { ApplyService } from 'src/app/Services/apply.service';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { EducationalInstitutionsApplicantService } from 'src/app/Services/educational-institutions-applicant.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private patientDetailsService: PatientDetailsService,
    private route: ActivatedRoute,
    private applyService: ApplyService,
    private educationalInstitutionsApplicantService: EducationalInstitutionsApplicantService,
    private detailsAskerService: DetailsAskerService,
    private renderer: Renderer2,
    private treatmentDetailsService: TreatmentDetailsService,
    private employeeService: EmployeeService,
    private myRouter: Router) { }
  idApply: any;
  currentPatientDetails: PatientDetails = new PatientDetails();
  affinity: string = "";
  self:string="";
  yachas: string = "";
  currentApply: Apply = new Apply();
  isInstition: string = "";
  isInstitionPast: string = "";
  isTherapeutic: string = "";
  isStillTerapist: string = "";
  isMatureCharacter: string = "";
  permissionContact: string = "";
  isClickP:boolean=false;
  arrayCurrentInstitionPresent: EducationalInstitutionsApplicant[] = [];
  arrayCurrentInstitionPast: EducationalInstitutionsApplicant[] = [];
  currentDetailsAsker: DetailsAsker = new DetailsAsker();
  isClickAddTreatment: boolean = false;
  newTreatmentDedails: TreatmentDetails = new TreatmentDetails();
  currentEmplorees: Employee = new Employee();
  arrEmployees: Employee[] = [];
  ageNow: any;
  gender: string = "";
  isTherapeuticT:string="";

  
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.idApply = +params['id'];
    });

    this.employeeService.getEmployee().subscribe(empL => {
      this.currentEmplorees = empL;
    },
      err => { console.log("error") });
    this.employeeService.GetAllEmployees().subscribe(empL => {
      this.arrEmployees = empL;
    },
      err => { console.log("error") });
    this.patientDetailsService.getPatientDetailsByApplyId(this.idApply).subscribe(patientDetails => {
      this.currentPatientDetails = patientDetails;
      if (this.currentPatientDetails.gender == "זכר") {
        this.gender = "בן"
        this.yachas = "הוא"
      }
      else {
        this.gender = "בת";
        this.yachas = "היא"

      }
      // if(this.currentPatientDetails.dateNow&&this.currentPatientDetails.ageFillApply){
      //   const timeDiff=  Math.abs(this.currentPatientDetails.dateNow.getTime() - new Date().getTime());
      //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      //   const diffYears = Math.round(timeDiff / (1000 * 60 * 60 * 24 * 365))+this.currentPatientDetails.ageFillApply;
      // this.ageNow=diffYears}
      
//האם היה בתהליך טיפולי
      if (this.currentPatientDetails.isTherapeutic) {
        if (this.gender == "בן"){
        this.isTherapeuticT="היה בעבר בתהליך טיפולי אצל: "
          this.isTherapeutic =this.currentPatientDetails.therapeutic?.firstName + " " +
            this.currentPatientDetails.therapeutic?.lastName + " טלפון: " + this.currentPatientDetails.therapeutic?.phone + " ";
      }
        else if (this.gender = "בת"){
        this.isTherapeuticT="היתה בעבר בתהליך טיפולי אצל: "
          this.isTherapeutic = this.currentPatientDetails.therapeutic?.firstName + " " +
            this.currentPatientDetails.therapeutic?.lastName + " טלפון: " + this.currentPatientDetails.therapeutic?.phone + " ";
}
      }
      else {
        if (this.gender == "בן")
          this.isTherapeutic = "לא היה בעבר בתהליך טיפולי אצל "
        else if (this.gender = "בת")
          this.isTherapeutic = "לא היתה בעבר בתהליך טיפולי אצל "
      }
      //נמצא עדיין בתהליך טיפולי
      if (this.currentPatientDetails.isStillTerapist) {
        if (this.gender == "בן") {
          this.isStillTerapist = " מטופל אצל : " + this.currentPatientDetails.therapeutic?.firstName + " " +
            this.currentPatientDetails.therapeutic?.lastName + " טלפון:" + this.currentPatientDetails.therapeutic?.phone + " ";
          if (this.currentPatientDetails.isContact == "לא") {
            this.permissionContact= " לא מאפשרים לפנות אליו. "
          }
          else {
            this.permissionContact = " במידת הצורך מאפשרים לפנות אליו. "
          }
          }
        else if (this.gender = "בת")
        {
          this.isStillTerapist = " מטופלת אצל : " + this.currentPatientDetails.therapeutic?.firstName + " " +
            this.currentPatientDetails.therapeutic?.lastName + " " + this.currentPatientDetails.therapeutic?.phone + " ";
          if (this.currentPatientDetails.isContact == "לא") {
            this.isStillTerapist += " לא מאפשרים לפנות  "
          }
          else {
            this.isStillTerapist += " במידת הצורך מאפשרים לפנות  "
          }
          }
        }
     else{
      if (this.gender == "בן") {
        this.isStillTerapist = "כיום לא נמצא בתהליך טיפולי";
        }
        else if (this.gender = "בת")
        {
          this.isStillTerapist = "כיום לא נמצאת בתהליך טיפולי";
        }
     }


      if (this.currentPatientDetails.isMatureCharacter){
          this.isMatureCharacter =this.currentPatientDetails.matureCharacter?.idMatureNavigation?.firstName+" "+
          this.currentPatientDetails.matureCharacter?.idMatureNavigation?.lastName+" טלפון: "+this.currentPatientDetails.matureCharacter?.idMatureNavigation?.phone;
          
      }
       
      else
        this.isMatureCharacter = "";
      this.getIns(this.currentPatientDetails.userId);
    },
      err => { console.log("error") });
    this.applyService.getApplyById(this.idApply).subscribe(apply => {
      this.currentApply = apply;
      this.getCurrentDetailsAsker(this.currentApply.askerId);
    },
      err => { console.log("error") });

  }
  resizeTextarea(textarea: any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  getCurrentDetailsAsker(askerId: any) {
    this.detailsAskerService.getDetailsAskerByUserAskerId(askerId).subscribe(asker => {
      this.currentDetailsAsker = asker;
      if (this.currentDetailsAsker.affinity == "הפונה")
        if (this.currentPatientDetails.gender == "זכר") {
          this.affinity = " הוא הופנה להאזינו ע'י";
          this.self="עצמו. "
        }
        else if (this.currentPatientDetails.gender == "נקבה") {
          this.affinity = "  היא הופנתה להאזינו ע'י";
          this.self="עצמה.";
        }
        else {
          this.affinity = this.currentDetailsAsker.affinity + " הם הופנו להאזינו ע'י ";
        }
    },
      err => { console.log("error") });
  }
  getIns(idUser: any) {

    if (this.currentPatientDetails.isInstition == true) {
      this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(idUser, "הווה      ").subscribe(arrIns => {
        this.arrayCurrentInstitionPresent = arrIns;
        if (this.arrayCurrentInstitionPresent.length > 0) {
          for (let index = 0; index < this.arrayCurrentInstitionPresent.length; index++) {
            if (this.gender == "בן")
              this.isInstition = " כיום לומד ב" + this.arrayCurrentInstitionPresent[index].institution?.idCategoryNavigation?.detailsCategory + "ב: "
                + this.arrayCurrentInstitionPresent[index].institution?.institutionName
                + "," + this.arrayCurrentInstitionPresent[index].institution?.enotherName + " ב: "
                + this.arrayCurrentInstitionPresent[index].details;
            else if (this.gender = "בת")
              this.isInstition = "כיום לומדת ב" + this.arrayCurrentInstitionPresent[index].institution?.idCategoryNavigation?.detailsCategory + "ב: "
                + this.arrayCurrentInstitionPresent[index].institution?.institutionName
                + "," + this.arrayCurrentInstitionPresent[index].institution?.enotherName + " ב: "
                + this.arrayCurrentInstitionPresent[index].details;
          }
        }
        else {
          if (this.gender == "בן")
            this.isInstition = "כיום לא נמצא במסגרת לימודית";
          else if (this.gender = "בת")
            this.isInstition = "כיום לא נמצאת במסגרת לימודית";
        }
      },
        err => { console.log("error") });
    }

    this.educationalInstitutionsApplicantService.getAllEducationalInstitutionByUserIdStatus(idUser, "עבר       ").subscribe(arrIns => {
      this.arrayCurrentInstitionPast = arrIns;
      if (this.arrayCurrentInstitionPast.length > 0) {
        for (let i = 0; i < this.arrayCurrentInstitionPast.length; i++) {
          if (i > 0) {
            if (this.arrayCurrentInstitionPast[i].institution?.idCategoryNavigation?.detailsCategory == this.arrayCurrentInstitionPast[i - 1].institution?.idCategoryNavigation?.detailsCategory)
              this.isInstitionPast += " ולאחר מכן עבר ל: " + this.arrayCurrentInstitionPast[i].institution?.institutionName + "," +
                this.arrayCurrentInstitionPast[i].institution?.enotherName + " " +
                "  ו : " + this.arrayCurrentInstitionPast[i].details;
          }

          else {
            this.isInstitionPast += "/n ב : " + this.arrayCurrentInstitionPast[i].institution?.idCategoryNavigation?.detailsCategory + " למד ב: " +
              this.arrayCurrentInstitionPast[i].institution?.institutionName + "," +
              this.arrayCurrentInstitionPast[i].institution?.enotherName + " " +
              "  ו : " + this.arrayCurrentInstitionPast[i].details;
          }
        }
      }
      else
        this.isInstitionPast += "לא פורטו מוסדות לימודים קודמים."
    },
      err => { console.log("error") });
  }
  addTraetmentDetails() {
    this.newTreatmentDedails.applyId = this.idApply;
    this.newTreatmentDedails.statusId = 4
    this.newTreatmentDedails.taskId = 11
    this.newTreatmentDedails.therapistId = this.currentEmplorees.id;
    this.newTreatmentDedails.nextEmployeesId = this.arrEmployees.find(x => x.job?.details == "אינטייק             ")?.id;
    this.newTreatmentDedails.dateNow = new Date();
    debugger
    this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDedails).subscribe(result => {
      this.myRouter.navigate(['/showDetailsApply/' + this.idApply]);

    },
      err => { console.log("error") });
  }


}
