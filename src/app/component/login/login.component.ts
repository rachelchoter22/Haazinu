import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: Employee = new Employee();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private myRouter: Router,
    private snackBar: MatSnackBar) { }
  employeesList: Employee[] = [];
  EmailToLogin !: string;
  //משתנה השומר את האימייל שנכנס
  //משתנה השומר את הסיסמה שהוזנה
  PassToLogin: string = "";
  //פעיל ריק
  emplo!: Employee;
  emploEmail: Employee = new Employee();
  //משתנה השומר את התשובה שתחזור מהפונקצייה השולפת את שם הפעיל
  Ans: string = "";

  ngOnInit(): void {
    // this.GetEmployeeName();
    this.form = this.formBuilder.group({
      emailV: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwordV: [null, [Validators.required, Validators.pattern("^[a-z0-9A-Z_-]{4,15}$")]]

    });
    //הצגת העין לסיסמה
    const togglePassword1 = document.querySelector("#togglePassword1");
    const password1 = document.querySelector("#password1");
    togglePassword1?.addEventListener('click', function () {
      // toggle the type attribute
      const type1 = password1?.getAttribute("type") === "password" ? "text" : "password";
      password1?.setAttribute("type", type1);

      // toggle the icon
      togglePassword1?.classList.toggle("bi-eye");
    });
    const button1 = document.getElementById('btn1');

    button1?.addEventListener('click', function handleClick(event) {
      console.log('button clicked');
      console.log(event);
      console.log(event.target);
    });
  }
  getErrorMessageEmail() {
    if (this.form.get('emailV')?.hasError('required')) {
      return 'שדה חובה-אנא הכנס כתובת אימייל';
    }
    return this.form.get('emailV')?.hasError('pattern') ? 'כתובת המייל אינה תקינה' : '';
  }
  getErrorMessagePassword() {
    if (this.form.get('passwordV')?.hasError('required')) {
      return '  שדה חובה-אנא הקלד סיסמה ';
    }
    return this.form.get('passwordV')?.hasError('pattern') ? 'סיסמה שגויה אנא הקלד בין 4-15 תווים מספרים/ אותיות' : '';
  }
  //כניסה למערכת ע"י שם משתמש וסיסמה
  login() {
    this.employeeService.GetEmployeeByPasswordEmail(this.EmailToLogin, this.PassToLogin).subscribe(emp => {
      this.emplo = emp;
      sessionStorage.setItem("userId", JSON.stringify(emp.id));
      console.log(this.emplo);

      this.Checklogin();
    },
      err => { console.log("error") });

  }

  //בדיקת שם משתמש וסיסמה וכן ניווטים מותאמים
  Checklogin() {

    if (this.emplo == null) {
      alert("פרטיך אינם מזוהים במערכת אנא פנה למנהל המערכת");
    }
    else if (this.emplo.password == null) {
      alert("אופס.. סיסמתך שגויה-נסה שנית ");
    }
    else {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.horizontalPosition = 'center';
      config.duration = 2000;
      config.direction = 'rtl'
      this.snackBar.open(" שלום לך " + this.emplo.idUserNavigation?.firstName + " היקר", 'הסר', config);
      this.employeeService.currentEmployees = this.emplo;
      if (this.emplo.job?.id == 1)
        this.myRouter.navigate(['/manager']);
      else if (this.emplo.job?.id == 3)
        this.myRouter.navigate(['/navigateSecretary']);
      else if (this.emplo.job?.id == 4)
        this.myRouter.navigate(['/inTakeNav']);
      else if (this.emplo.job?.id == 5)
        this.myRouter.navigate(['/navigatePatient']);
    }
  }
    forgetPassword(){
      this.employeeService.GetEmployeeByEmail(this.EmailToLogin).subscribe(emp => {
        this.emploEmail = emp;
        this.employeeService.currentEmployees = this.emploEmail;
        console.log(this.employeeService.currentEmployees);
      },
        err => { console.log("error") });

      this.checkforgetPassword();

    }
    checkforgetPassword(){
      if (this.emplo == null) {
        console.log("פרטיך אינם מזוהים במערכת אנא פנה למנהל המערכת");
      }
      else {
        this.myRouter.navigate(['/' + this.EmailToLogin]);
      }
    }
    // //מחזיר את רשימת הפעילים בפרוייקט
    GetAllEmployees(){
      this.employeeService.GetAllEmployees().subscribe(emp => {
        this.employeesList = emp;
        console.log(emp);
      });
    }
  }

