import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/Classes/Address';
import { EducationalInstitution } from 'src/app/Classes/EducationalInstitution';
import { EducationalInstitutionsApplicant } from 'src/app/Classes/EducationalInstitutionsApplicant';
import { InstitutionsCategory } from 'src/app/Classes/InstitutionsCategory';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { AddressService } from 'src/app/Services/address.service';
import { ApplyService } from 'src/app/Services/apply.service';
import { EducationalInstitutionService } from 'src/app/Services/educational-institution.service';
import { EducationalInstitutionsApplicantService } from 'src/app/Services/educational-institutions-applicant.service';
import { InstitutionsCategoryService } from 'src/app/Services/institutions-category.service';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';

@Component({
  selector: 'app-educational-institutions-applicant',
  templateUrl: './educational-institutions-applicant.component.html',
  styleUrls: ['./educational-institutions-applicant.component.scss']
})
export class EducationalInstitutionsApplicantComponent implements OnInit {
  @Input()
  category: InstitutionsCategory = new InstitutionsCategory();
  @Input()
  indexCategory: any;
  constructor(private patientDetailsService: PatientDetailsService,
    private institutionsCategoryService: InstitutionsCategoryService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private myRouter: Router,
    private educationalInstitutionService: EducationalInstitutionService,
    private educationalInstitutionsApplicantService: EducationalInstitutionsApplicantService,
    private applyService: ApplyService,
    private route: ActivatedRoute
  ) { }
  arrayG = [
    { id: 1, name: "ועד א" },
    { id: 3, name: "ועד ב" },
    { id: 4, name: "ועד ג" },
    { id: 5, name: "ועד ד" },
    { id: 6, name: "ועד ה" },
    { id: 7, name: "ועד ו ומעלה" }
  ];
  arrayK = [
    { id: 1, name: "שיעור א" },
    { id: 2, name: "שיעור ב" },
    { id: 3, name: "שיעור ג" },
    { id: 4, name: "שיעור ד" },
  ];
  arrayC = [
    { id: 1, name: "כיתה א" },
    { id: 2, name: "כיתה ב" },
    { id: 3, name: "כיתה ג" },
    { id: 4, name: "כיתה ד" },
    { id: 5, name: "כיתה ה" },
    { id: 6, name: "כיתה ו " },
    { id: 7, name: "כיתה ז" },
    { id: 8, name: "כיתה ח" },
    { id: 9, name: "כיתה י" },
    { id: 10, name: "כיתה יא" },
    { id: 11, name: "כיתה יב" },
    { id: 12, name: "כיתה יג " },
    { id: 13, name: "כיתה יד " }
  ];
  arrayYLeave = [
    { id: 1, name: "אלול" },
    { id: 2, name: "חורף אמצע זמן" },
    { id: 3, name: " חורף סוף זמן" },
    { id: 4, name: " קיץ אמצע זמן" },
    { id: 5, name: " קיץ סוף זמן" }
  ];
  arrayCLeave = [
    { id: 1, name: " אמצע שנה" },
    { id: 1, name: "סוף שנה " },

  ];
  form!: FormGroup;
  chooseArray: any;
  // index:number=this.institutionsCategoryService.indexCurrentListInstitutionsCategory;
  currentCategory: any;
  arrayExistCities: string[] = [];
  selectedValueCity: string = "";
  isAnotherCity: boolean = false;
  //** */ nameAnotherCity:string="";
  arrayEducational: EducationalInstitution[] = [];
  currentChooseEdu: EducationalInstitution = new EducationalInstitution();
  isInstitionPast: boolean = false;
  arrayCityByEdu: string[] = [];
  notExistCity: boolean = false;
  nameAnotherCity: string = "";

  ///////////////////////////
  arrayECat: EducationalInstitution[] = [];
  arrayToShow: EducationalInstitution[] = [];
  selectedValueNameIns: string = "";
  isAnotherInstiton: boolean = false;
  newEducationalInstitution: EducationalInstitution = new EducationalInstitution();

  newAddress: Address = new Address();
  isTvach: any;
  //כיתת עזיבה
  selectedValueClassL: string = "";
  //זמן עזיבה
  chooseTimeLeave: string = "";
  chooseArrayLeave: any;
  newEducationalInstitutionsApplicant: EducationalInstitutionsApplicant = new EducationalInstitutionsApplicant();
  currentPatientDetailsByApplyId: PatientDetails = new PatientDetails();
  numApply: any;
  arrCategory: InstitutionsCategory[] = [];
  arrayNewCategory: InstitutionsCategory[] = [];
  isNextFillIntake: boolean = false;
  isSaveNow: boolean = false

  ngOnInit(): void {
    this.isAnotherInstiton = false;
    let isPast = sessionStorage.getItem('isPast');
    if (isPast != null) {
      this.isInstitionPast = JSON.parse(isPast);
    }
    let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.currentPatientDetailsByApplyId = JSON.parse(data) as PatientDetails;
    }
    let arrayCategory = sessionStorage.getItem('currentListCategory');
    if (arrayCategory != null) {
      this.arrCategory = JSON.parse(arrayCategory) as InstitutionsCategory[];
    }
    this.educationalInstitutionService.GetAllInstitutionsByCategories(this.category.id)
      .subscribe(allEducational => {
        this.arrayEducational = allEducational;
        if (this.arrayEducational.length == 0) {
          this.isAnotherInstiton = true;
          this.notExistCity = true;
        }
        //getAllcity
        this.addressService.GetAllCities().subscribe(allCities => {
          this.arrayExistCities = allCities;
          console.log(allCities);
        },
          err => { console.log("error") });
      },
        err => { console.log("error") });

    //בחירת הצג}ת טווח של שנת הלימודים
    if (this.category.id == 8 || this.category.id == 9 || this.category.id == 13) {
    }
    else if (this.category.id == 18 || this.category.id == 14) {
      this.chooseArray = this.arrayG;
      this.chooseArrayLeave = this.arrayYLeave;
    }
    else if (this.category.id == 3) {
      this.chooseArray = this.arrayK;
      this.chooseArrayLeave = this.arrayYLeave;
    }
    else {
      this.chooseArray = this.arrayC;
      this.chooseArrayLeave = this.arrayCLeave;
    }


    this.form = this.formBuilder.group({
      hebrewLetters: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()-\]+$`)]]
    });


  }
  getErrorMessageHebrewLetters() {
    if (this.form.get('hebrewLetters')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLetters')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }

  //בחירת מוסד לימודים
  onSelectedValueNameIns(ins: any) {
    this.isAnotherInstiton = false;
    this.notExistCity = false;
    if (ins == "אחר") {
      this.isAnotherInstiton = true;
      this.notExistCity = true;
    }
    else {
      for (let index = 0; index < this.arrayEducational.length; index++) {
        if (this.arrayEducational[index].institutionName == ins) {
          this.currentChooseEdu = this.arrayEducational[index];
          this.newEducationalInstitutionsApplicant.institutionId = this.arrayEducational[index].id;
          this.showCityByEducational();
          break;
        }
      }
    }
  }
  //הצגת ערים לפי המוסד שנבחר
  showCityByEducational() {
    this.arrayCityByEdu = [];
    this.notExistCity = false;
    for (let index = 0; index < this.arrayEducational.length; index++) {
      if (this.arrayEducational[index].institutionName == this.currentChooseEdu.institutionName)
        if (this.arrayEducational[index].address?.city != undefined)
          this.arrayCityByEdu.push("" + this.arrayEducational[index].address?.city);
    }
    if (this.arrayCityByEdu.length == 0)
      this.notExistCity = true;
  }
  //cities
  onSelectedValueChange(value: any) {
    this.isAnotherCity = false;
    if (value == "אחר")
      this.notExistCity = true;
    else {
      for (let index = 0; index < this.arrayEducational.length; index++) {
        if (this.arrayEducational[index].address?.city == value) {
          if (this.arrayEducational[index].institutionName == this.currentChooseEdu.institutionName) {
            this.currentChooseEdu = this.arrayEducational[index];
            this.newEducationalInstitutionsApplicant.institutionId = this.arrayEducational[index].id;
            break;
          }
        }
      }
    }
  }
  isClickReturnList() {
    this.notExistCity = false;
    this.isAnotherInstiton = false;
    this.selectedValueNameIns = "";
  }
  ///////////////////////
  /////////שליחת מוסד לימודים חדש//////////////////////

  next() {
    if (this.isAnotherInstiton || this.notExistCity)
      this.addAddressCity();
    else
      this.addEducational()
  }
  //הוספת עיר/ כתובת חדשה
  addAddressCity() {
    this.addressService.AddAddress(this.newAddress).subscribe(idAddress => {
      if (this.isAnotherInstiton)
        this.addInstition(idAddress);
      else {
        this.currentChooseEdu.addressId = idAddress;
        this.addEducational();
      }
    },
      err => { console.log("error") });
  }
  //הוספת מוסד לימודים חדש
  addInstition(addressId: any) {
    this.newEducationalInstitution.addressId = addressId;
    this.newEducationalInstitution.idCategory = this.category.id;
    this.educationalInstitutionService.AddEducationalInstitution(this.newEducationalInstitution).subscribe(idNewInst => {
      this.newEducationalInstitutionsApplicant.institutionId = idNewInst;
      this.addEducational();
    },
      err => { console.log("error") });
  }
  addEducational() {
    // this.isNextFillIntake=false;
    //פרטי המוסד לימודים
    this.newEducationalInstitutionsApplicant.userId = this.currentPatientDetailsByApplyId.userId;
    if (this.isInstitionPast == false) {
      this.newEducationalInstitutionsApplicant.status = "הווה";
      this.newEducationalInstitutionsApplicant.details = "" + this.selectedValueClassL;
    }
    else if (this.isInstitionPast == true) {
      this.newEducationalInstitutionsApplicant.status = "עבר";
      this.newEducationalInstitutionsApplicant.details = "עזב ב : " + this.selectedValueClassL + "  זמן עזיבה :" + this.chooseTimeLeave;
    }
    this.educationalInstitutionsApplicantService.AddEducational(this.newEducationalInstitutionsApplicant).subscribe(idEduAp => {
      for (let index = this.indexCategory; index < this.arrCategory.length; index++) {
        this.arrayNewCategory.push(this.arrCategory[index]);
      }
      sessionStorage.setItem("currentListCategory", JSON.stringify(this.arrayNewCategory));
      this.arrayNewCategory = [];
      this.arrCategory = [];
      // this.isNextFillIntake = true;
      // sessionStorage.setItem("isPastEducation", JSON.stringify(this.isInstitionPast));
      if (!this.isInstitionPast) {
        this.isInstitionPast = true;
        this.myRouter.navigate(['/fillNewApply/' + this.currentPatientDetailsByApplyId.applyId + '/' +
          this.isInstitionPast]);
      }
      else
        location.reload();
    },
      err => { console.log("error") });
  }





  ////////////////////////////////////////////////////////////
  //   next() {
  //     // userId?: number;
  //     // institutionId?:number
  //     // status?:string;
  //     // details?: string;
  // this.newEducationalInstitutionsApplicant.userId=this.currentPatientDetailsByApplyId.userId;
  // if(this.isAnotherInstiton==true)
  // console.log(this.newEducationalInstitution);
  //     // id?: number;
  //     // idCategory?:number;
  //     // addressId?: number;
  //     // institutionName?: string;
  //     // enotherName?:string;



  //     //החזרת פרטי הפנייה
  //     // this.getPatientDetailsByIdApply();
  //     // this.newEducationalInstitutionsApplicant.userId=this.patientDetailsService.currentPatientDetails.userId;
  //     //במידה ובחר אחר
  //   }


  // next() {
  //   this.newEducationalInstitutionsApplicant.userId = this.currentPatientDetailsByApplyId.userId;
  //   debugger
  //   if (this.isAnotherInstiton == true)
  //     console.log(this.newEducationalInstitution);
  //   // userId?: number;
  //   // institutionId?:number
  //   // status?:string;
  //   // details?: string;
  //   ///////////////////////////
  //   // id?: number;
  //   // idCategory?:number;
  //   // addressId?: number;
  //   // institutionName?: string;
  //   // enotherName?:string;



  //   //החזרת פרטי הפנייה
  //   // this.getPatientDetailsByIdApply();
  //   // this.newEducationalInstitutionsApplicant.userId=this.patientDetailsService.currentPatientDetails.userId;
  //   //במידה ובחר אחר
  // }
  getPatientDetailsByIdApply() {
    //החזרת פרטי הפניה
    // this.patientDetailsService.getPatientDetailsByApplyId(this.numApply).subscribe(patientDetails => {
    //   this.currentPatientDetailsByApplyId = patientDetails;
    this.newEducationalInstitutionsApplicant.userId = this.currentPatientDetailsByApplyId.userId;
    if (this.isAnotherCity)
      this.addAddressCity();
    //במידה ולא קיים מוסד לימודים בעיר שנבחרה
    else if (this.isAnotherInstiton) {
      this.getIdAddressByCity();
    }
    else {
      this.newEducationalInstitutionsApplicant.institutionId = this.newEducationalInstitution.id;
      this.addEducational();
    }
    // },
    //   err => { console.log("error") });
  }
  getIdAddressByCity() {
    this.addressService.getIdAddressByCity(this.selectedValueCity).subscribe(idAddress => {
      this.addInstition(idAddress);
    },
      err => { console.log("error") });
  }


  saveNow() {
    this.isSaveNow = true;
    this.next();

  }

  nextFillIntake() {
    this.isNextFillIntake = true;
    this.next();
  }

  //הצגת מוסדות לימוד לפי העיר שנבחרה
  showEducationalByCity() {
    this.arrayToShow = [];
    this.arrayECat = this.arrayEducational;
    for (let index = 0; index < this.arrayECat.length; index++) {
      if (this.arrayECat[index].address?.city == this.selectedValueCity)
        this.arrayToShow.push(this.arrayECat[index]);
    }
    if (this.arrayToShow.length == 0)
      this.isAnotherInstiton = true;
  }


}
