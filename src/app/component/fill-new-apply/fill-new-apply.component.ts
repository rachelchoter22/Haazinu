import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { PatientDetails } from 'src/app/Classes/PatientDetails';
import { Sector } from 'src/app/Classes/Sector';
import { User } from 'src/app/Classes/User';
import { ApplyService } from 'src/app/Services/apply.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { SectorService } from 'src/app/Services/sector.service';
import { UserService } from 'src/app/Services/user.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Family } from 'src/app/Classes/Family';
import { Address } from 'src/app/Classes/Address';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { AddressService } from 'src/app/Services/address.service';
import { FamilyService } from 'src/app/Services/family.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from 'src/app/Classes/Apply';
import { Employee } from 'src/app/Classes/Employee';
import { ThemePalette } from '@angular/material/core';
import { MatureCharacter } from 'src/app/Classes/MatureCharacter';
import { DetailsAsker } from 'src/app/Classes/DetailsAsker';
import { MatureCharacterService } from 'src/app/Services/mature-character.service';
import { DetailsAskerService } from 'src/app/Services/details-asker.service';
import { TreatmentDetailsService } from 'src/app/Services/treatment-details.service';
import { TreatmentDetails } from 'src/app/Classes/TreatmentDetails';
@Component({
  selector: 'app-fill-new-apply',
  templateUrl: './fill-new-apply.component.html',
  styleUrls: ['./fill-new-apply.component.scss']
})
export class FillNewApplyComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    private matureCharacterService:MatureCharacterService,
    private detailsAskerService:DetailsAskerService,
    private applyService: ApplyService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private sectorService: SectorService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private patientDetailsService: PatientDetailsService,
    private familyService: FamilyService,
    private myRouter: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private treatmentDetailsService:TreatmentDetailsService
  ) { }

  form!: FormGroup;
  arrayMonth = [
    { id: 1, name: "תשרי" },
    { id: 2, name: "חשוון" },
    { id: 3, name: "כסליו" },
    { id: 4, name: "טבת" },
    { id: 5, name: "שבט" },
    { id: 6, name: "אדר" },
    { id: 7, name: "ניסן" },
    { id: 8, name: "אייר" },
    { id: 9, name: "סיון" },
    { id: 10, name: "תמוז" },
    { id: 11, name: "אב" },
    { id: 12, name: "אלול" },
    { id: 1, name: "ינואר" },
    { id: 2, name: "פברואר" },
    { id: 3, name: "מרץ" },
    { id: 4, name: "אפריל" },
    { id: 5, name: "מאי" },
    { id: 6, name: "יוני" },
    { id: 7, name: "יולי" },
    { id: 8, name: "אוגוסט" },
    { id: 9, name: "ספטמבר" },
    { id: 10, name: "אוקטובר" },
    { id: 11, name: "נובמבר" },
    { id: 12, name: "דצמבר" },

  ];
  arrayGender = [
    { id: 1, name: "זכר" },
    { id: 2, name: "נקבה" }
  ];
  arrayStatusParent = [
    { id: 1, name: "נורמטיבי" },
    { id: 2, name: " גרושים " },
    { id: 3, name: "יתומים" },
    { id: 4, name: "אחר" }

  ];
  arraySector: Sector[] = [];
  anotherSector: string = "";
  anotherSectorO: Sector = new Sector();
  isAnotherSector: boolean = false;
  newTreatmentDetails:TreatmentDetails=new TreatmentDetails();

  newPatientDetails: PatientDetails = new PatientDetails();
  newMatureCharacter: MatureCharacter = new MatureCharacter();
  userMature: User = new User();
  newUserTherapist: User = new User();
  newDetailsAsker: DetailsAsker = new DetailsAsker();
  numApply: any;
  nameFill: any;
  currentEmployees: Employee = new Employee();
  dateFill: Date = new Date();
  user: User = new User();
  newFamily: Family = new Family();
  age: string = "";
  ageNow?: number;
  hebDate: string = "";
  newAddress: Address = new Address();
  selectedOptionIns: any;
  isInstition?: boolean;
  isJerusalem: boolean = false;
  currentApply: Apply = new Apply();
  isNotExistPatient: boolean = false;
  familyDetails: string = "";
  isPressPE: boolean = false;
  isPressRM: boolean = false;
  isPressMM: boolean = false;
  isPressMLN: boolean = false;
  isPressPP: boolean = false;
  isPressSZ: boolean = false;
  color: ThemePalette = "primary";
  isInstitionPast?: boolean;
  //dateHebr
  // date = new Date();


  ngOnInit(): void {
    this.isNotExistPatient = false;
    this.route.params.subscribe(params => {
      const id = +params['idApply'];
      this.numApply = id;
      const isPastEducation = Boolean(params['isPastEducation']);
      this.isInstitionPast = isPastEducation;
      sessionStorage.setItem("isPast", JSON.stringify(this.isInstitionPast));
      if (this.isInstitionPast == true) {
        this.isPressMLN = true;
      }
      sessionStorage.setItem("applyId", JSON.stringify(id));
      this.getCurrentApply();
    });

    let currentPatient=sessionStorage.getItem('currentPatientDetails');
    if (currentPatient !== null) {
      this.newPatientDetails = JSON.parse(currentPatient) as PatientDetails;
      this.isNotExistPatient = true;
        if (this.newPatientDetails.user)
          this.user = this.newPatientDetails.user;
        if (this.newPatientDetails.address) {

          this.isJerusalem = false;
          this.newAddress = this.newPatientDetails.address;
          if (this.newAddress.city == "ירושלים")
            this.isJerusalem = true;
        }
        if (this.newPatientDetails.family) {
          this.newFamily = this.newPatientDetails.family
          if (this.newFamily.familyDetails)
            this.familyDetails = this.newFamily.familyDetails
        }
    }
    else{
    this.patientDetailsService.getPatientDetailsByApplyId(this.numApply).subscribe(patientDetails => {
      if (patientDetails != null) {
        this.newPatientDetails = patientDetails;
        this.isNotExistPatient = true;
        if (this.newPatientDetails.user)
          this.user = this.newPatientDetails.user;
        if (this.newPatientDetails.address) {
          this.isJerusalem = false;
          this.newAddress = this.newPatientDetails.address;
          if (this.newAddress.city == "ירושלים")
            this.isJerusalem = true;
        }
        if (this.newPatientDetails.family) {
          this.newFamily = this.newPatientDetails.family
          if (this.newFamily.familyDetails)
            this.familyDetails = this.newFamily.familyDetails
        }
      }
    },
      err => { console.log("error") });
    }
    this.employeeService.getEmployee().subscribe(empL => {
      this.nameFill = empL?.idUserNavigation?.firstName;
      this.currentEmployees = empL;
      this.newPatientDetails.fillEmloyeesId = empL.id;
      this.newPatientDetails.applyId = this.numApply;
    },
      err => { console.log("error") });

    this.newPatientDetails.dateNow = new Date();

    this.isAnotherSector = false;

    //הצגת מגזרים
    this.sectorService.GetAllSector().subscribe(arraySector => {
      this.arraySector = arraySector;
      console.log(this.arraySector);
    },
      err => { console.log("error") });
    this.form = this.formBuilder.group({
      hebrewLettersF: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      hebrewLettersL: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      numberV: [null, [Validators.required, Validators.pattern('^([1-9]|[1-2][0-9]|25)$')]],
      numberVV: [null, [Validators.required, Validators.pattern('^([1-9]|[1-2][0-9]|25)$')]],
      ageV: [null, [Validators.required, Validators.pattern('^([6-9]|[1-9][0-9])$')]],
      textAreaHeb: [null, [Validators.required, Validators.pattern(`^[\u0590-\u05FF .,?!"':;_()\n-\]+$`)]],
      mobileNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      mobileNumberP: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      textArea: [""]

    });
  }
  resizeTextarea(textarea: any) {
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }
  saveAndUpdateDetailsCause() {
    this.currentApply.detailsCausedRefferal
    this.applyService.UpdateApply(this.numApply, this.currentApply).subscribe(resultApply => {
      debugger
    },
      err => { console.log("error") });
  }
  getCurrentApply() {
    this.applyService.getApplyById(this.numApply).subscribe(apply => {
      this.currentApply = apply;
    },
      err => { console.log("error") });
  }
  getErrorMessageMobileNumber() {
    if (this.form.get('mobileNumber')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumber')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageMobileNumberP() {
    if (this.form.get('mobileNumberP')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('mobileNumberP')?.hasError('pattern') ? '  מספר טלפון שגוי   ' : '';
  }
  getErrorMessageHebrewLettersF() {
    if (this.form.get('hebrewLettersF')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersF')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLettersTExtA() {
    if (this.form.get('textAreaHeb')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('textAreaHeb')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageHebrewLettersL() {
    if (this.form.get('hebrewLettersL')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('hebrewLettersL')?.hasError('pattern') ? '  אותיות עברית בלבד ' : '';
  }
  getErrorMessageNumber() {
    if (this.form.get('numberV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('numberV')?.hasError('pattern') ? '   מספר ילדים בין 1-25 בלבד  ' : 'מספר ילדים בין 1-25 בלבד';
  }
  getErrorMessageNumberV() {
    if (this.form.get('numberVV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('numberVV')?.hasError('pattern') ? '   מספר ילדים בין 1-25 בלבד  ' : 'מספר ילדים בין 1-25 בלבד';
  }
  getErrorMessageAge() {
    if (this.form.get('ageV')?.hasError('required')) {
      return '  שדה חובה   ';
    }
    return this.form.get('ageV')?.hasError('pattern') ? '  גיל אינו חוקי אנא הקלד גיל בין 6 ל-99 ' : '';
  }
  validPlace() {
    if (this.newFamily.childrenNumber != null && this.newPatientDetails.familyPlace != null) {
      if (this.newFamily.childrenNumber < this.newPatientDetails.familyPlace)
        return false;
      else return true;
    }
    else {
      return true;
    }
  }
  //selectSector
  onSelectedValueChangeSector(value: any) {
    debugger
    this.isAnotherSector = false;
    const currentSector = this.arraySector.find(s => s.id == value);
    if (currentSector != null && currentSector.id == 4)
      this.isAnotherSector = true;
  }
  onInputValueCity(value: any) {
    this.isJerusalem = false
    if (this.newAddress.city == "ירושלים")
      this.isJerusalem = true;
  }

  onChangeIns(valuel: any) {
    debugger
    if (this.newPatientDetails.gender == "" || this.newPatientDetails.ageFillApply == undefined || (this.newPatientDetails.gender == "" && this.newPatientDetails.ageFillApply == undefined)) {
      alert(" כדי שנוכל לעבור לעבור לשלב הבא יש לבחור מין :זכר / נקבה וכן למלא גיל")
      this.selectedOptionIns = null;
    }
    else {
      console.log(this.selectedOptionIns);
      if (valuel.value == '1') {
        this.newPatientDetails.isInstition = true;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.isPressPP = false;
        sessionStorage.setItem("currentFamily", JSON.stringify(this.newFamily));
        sessionStorage.setItem("currentAddress", JSON.stringify(this.newAddress));
        sessionStorage.setItem("userPatientDetails", JSON.stringify(this.user));

        //this.myRouter.navigate(['/institutionsCategoryFirst/' + this.numApply + '/' + this.newPatientDetails.gender + '/' + this.age]);
      }
      else if (valuel.value == '2') {
        this.newPatientDetails.isInstition = false;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.isPressPP = false;
        // this.myRouter.navigate(['/institutionsCategory/' + this.numApply + '/' + this.newPatientDetails.gender + '/' + this.age]);
      }
      else if (valuel.value == '3') {
        if(this.isInstitionPast)
        this.isPressMLN=false;
        else
        this.newPatientDetails.isInstition = false;
        sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));
        this.isPressPP = true;
      }
    }
  }
  //sent another sector and add it on the list sector
  sendValue(value: any) {
    this.anotherSectorO.detailsSector = value;
    this.sectorService.AddSector(this.anotherSectorO).subscribe(addSector => {
      console.log(this.arraySector);
    },
      err => { console.log("error") });
  }

  // add a user
  addNewUser() {
    this.userService.AddUser(this.user).subscribe(asker => {
      this.newPatientDetails.userId = asker;
      this.addAddress();
    },
      err => { console.log("error") });
  }
  //addAddress
  addAddress() {
    this.addressService.AddAddress(this.newAddress).subscribe(idAddress => {
      this.newPatientDetails.addressId = idAddress;
      this.addFamily();
    },
      err => { console.log("error") });
  }

  //addFamily
  addFamily() {
    this.familyService.AddFamily(this.newFamily).subscribe(idFamily => {
      this.newPatientDetails.familyId = idFamily;
      this.addDetailsAsker();
    },
      err => { console.log("error") });
  }
  addDetailsAsker(){
    if(this.currentApply){
      this.newDetailsAsker.id=undefined
    this.newDetailsAsker.userId=this.currentApply.asker?.id;
    this.newDetailsAsker.idResone=this.currentApply.applyCausedId;
        this.detailsAskerService.AddDetailsAsker(this.newDetailsAsker).subscribe(resultDetails => {
        this.newPatientDetails.idDetailsAsker=resultDetails;
        // this.newDetailsAsker.id=resultDetails;
        this.addPatientDetails();
        },
          err => { console.log("error") });
      }}
  //addPatientDetails
  addPatientDetails() {
    this.patientDetailsService.AddPatientDetails(this.newPatientDetails).subscribe(idPatient => {
      // this.newPatientDetails.id = idPatient;
     this.addTreatment();
    },
      err => { console.log("error") });
  }

  addTreatment(){
    //הוספת שלב ביצוע  לסיווג מנהלי
        this.newTreatmentDetails.applyId=this.numApply;
        this.newTreatmentDetails.therapistId=this.currentEmployees.id;
        this.newTreatmentDetails.dateNow=new Date();
          this.newTreatmentDetails.taskId=8;
          this.newTreatmentDetails.statusId=2;
           this.treatmentDetailsService.AddTreatmentDetails(this.newTreatmentDetails).subscribe(result=>{
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.horizontalPosition = 'center';
            config.duration = 2000;
            config.direction='rtl'
            this.snackBar.open(" פרטי פנייה מספר "+this.numApply+" נקלטו בהצלחה", 'הסר',config);
            this.return();
          },
          err=>{console.log("error")}); 
      }
  //////////////////////////
//   updateUser() {
//     this.userService.UpdateUser(this.newPatientDetails.userId, this.user).subscribe(asker => {
//       this.updateFamily();
//     },
//       err => { console.log("error") });
//   }
//   updateFamily() {

//     this.familyService.UpdateFamily(this.newPatientDetails.familyId, this.newFamily).subscribe(family => {
//       this.updateAddress();
//     },
//       err => { console.log("error") });
//   }
//   updateAddress() {

//     this.addressService.UpdateAddress(this.newPatientDetails.addressId, this.newAddress).subscribe(address => {
// this.updateDetailsAsker();
// },
//       err => { console.log("error") });

//   }
//   updateDetailsAsker(){
//     this.detailsAskerService.UpdateDetailsAsker(this.newDetailsAsker.id,this.newDetailsAsker).subscribe(resultDetails => {
//     this.newPatientDetails.idDetailsAsker=this.newDetailsAsker.id;
//     if(this.isNotExistPatient)
//     this.updatePatientDetails();
//     else
//     this.addPatientDetails();
//     },
//       err => { console.log("error") });
//   }
//   updatePatientDetails() {
//     debugger
//     this.patientDetailsService.UpdatePatientDetails(this.newPatientDetails.id, this.newPatientDetails).subscribe(patientDetails => {
//       console.log(patientDetails);
//       debugger
//     },
//       err => { console.log("error") });
//   }

  saveNow() {
    debugger
    // sessionStorage.setItem("currentPatientDetails", JSON.stringify(this.newPatientDetails));

    let data = sessionStorage.getItem('currentPatientDetails');
    if (data !== null) {
      this.newPatientDetails = JSON.parse(data) as PatientDetails;
      /////
      if (this.newPatientDetails.isMatureCharacter == true) {
        let matureCharacter = sessionStorage.getItem('matureCharacter');
        if (matureCharacter !== null) {
          this.newMatureCharacter = JSON.parse(matureCharacter) as MatureCharacter;
          this.addMature();
        }
      }
      if (this.newPatientDetails.isTherapeutic == true) {
        let userTherapist = sessionStorage.getItem('userTherapist');
        if (userTherapist !== null) {
          this.newUserTherapist = JSON.parse(userTherapist) as User;
        }
        this.addUserTherapist();
      }
    }
    let detailsAsker = sessionStorage.getItem('detailsAsker');
    if (detailsAsker !== null) {
      this.newDetailsAsker = JSON.parse(detailsAsker) as DetailsAsker;
    }
let currentFamily=sessionStorage.getItem('currentFamily');
if (currentFamily !== null) {
  this.newFamily = JSON.parse(currentFamily) as Family;
}
let currentAddress=sessionStorage.getItem('currentAddress');
if (currentAddress !== null) {
  this.newAddress = JSON.parse(currentAddress) as Address;
}
let userPatientDetails=sessionStorage.getItem('userPatientDetails');
if (userPatientDetails !== null) {
  this.user = JSON.parse(userPatientDetails) as User;
}
    ////////////////////////
    // if (this.isNotExistPatient == true)
    //   this.updateUser();
    // else
      this.addNewUser();

  }

  addUserTherapist() {
    this.userService.AddUser(this.newUserTherapist).subscribe(terapist => {
      this.newPatientDetails.therapeuticId = terapist;
    },
      err => { console.log("error") })
  }
  addMature() {
    let userMature = sessionStorage.getItem('userMetapelC');
    if (userMature !== null) {
      this.userMature = JSON.parse(userMature) as User;
    }
    this.userService.AddUser(this.userMature).subscribe(terapist => {
      this.newMatureCharacter.idMature = terapist;
      this.addNewMature();
    },
      err => { console.log("error") });
  }
  addNewMature() {
    this.newMatureCharacter.idApplicant = this.numApply;
    this.matureCharacterService.AddMatureCharacter(this.newMatureCharacter).subscribe(mature => {
      this.newPatientDetails.matureCharacterId = mature;
    },
      err => { console.log("error") });
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
