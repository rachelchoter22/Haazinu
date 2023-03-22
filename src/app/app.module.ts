import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import{FormsModule,ReactiveFormsModule} from  '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { EmployeeService } from './Services/employee.service';
import { UserService } from './Services/user.service';
import { ReferenceManagerComponent } from './component/reference-manager/reference-manager.component';
import { CodeSendComponent } from './component/code-send/code-send.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { NavigateSecretaryComponent } from './component/navigate-secretary/navigate-secretary.component';
import { DetailsApplicantsComponent } from './component/details-applicants/details-applicants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule} from '@angular/material/select';
import { InTakeNavComponent } from './component/in-take-nav/in-take-nav.component';
import { FillNewApplyComponent } from './component/fill-new-apply/fill-new-apply.component'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import {MatError} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { EducationalInstitutionsComponent } from './component/educational-institutions/educational-institutions.component';
import { InstitutionsCategoryComponent } from './component/institutions-category/institutions-category.component';
import { EducationalInstitutionsApplicantComponent } from './component/educational-institutions-applicant/educational-institutions-applicant.component';
// import { DetailApplyComponent } from './component/detail-apply/detail-apply.component';
import { NewApplySecreteryComponent } from './component/new-apply-secretery/new-apply-secretery.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import {AfterViewInit, ViewChild} from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
//import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { InstitutionsCategoryFirstComponent } from './component/institutions-category-first/institutions-category-first.component';
import { SearchPipe } from './search.pipe';
import { ShowDetailsApplyComponent } from './component/show-details-apply/show-details-apply.component';
import { DatePipe } from '@angular/common';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';
import { NewTreatmentDetailsComponent } from './component/new-treatment-details/new-treatment-details.component';
import { AwaitingExecutionComponent } from './component/awaiting-execution/awaiting-execution.component';
import { NewTratmentDetailsManagerComponent } from './component/new-tratment-details-manager/new-tratment-details-manager.component';
import {MatIconModule} from '@angular/material/icon';
import { SystemActivityComponent } from './component/system-activity/system-activity.component';
import { AllApplyManagerComponent } from './component/all-apply-manager/all-apply-manager.component';
import { StatusApplyManagerComponent } from './component/status-apply-manager/status-apply-manager.component';
import { AwaitingClassificationComponent } from './component/awaiting-classification/awaiting-classification.component';
import { WaitPageComponent } from './component/wait-page/wait-page.component';
import { NavigatePatientComponent } from './component/navigate-patient/navigate-patient.component';

export class MyModule {}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    UpdatePasswordComponent,
    ForgetPasswordComponent,
    ReferenceManagerComponent,
    CodeSendComponent,
    NewPasswordComponent,
    NavigateSecretaryComponent,
    DetailsApplicantsComponent,
    InTakeNavComponent,
    FillNewApplyComponent,
    EducationalInstitutionsComponent,
    InstitutionsCategoryComponent,
    EducationalInstitutionsApplicantComponent,
    // DetailApplyComponent,
    NewApplySecreteryComponent,
    InstitutionsCategoryFirstComponent,
    SearchPipe,
    ShowDetailsApplyComponent,
    PatientDetailsComponent,
    NewTreatmentDetailsComponent,
    AwaitingExecutionComponent,
    NewTratmentDetailsManagerComponent,
    SystemActivityComponent,
    AllApplyManagerComponent,
    StatusApplyManagerComponent,
    AwaitingClassificationComponent,
    WaitPageComponent,
    NavigatePatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    // MatPaginator,
   // MatTableDataSource
   MatTableModule,
   Ng2SearchPipeModule,
   MatIconModule,
   BrowserAnimationsModule
  ],
  providers: [EmployeeService,DatePipe,UserService , { provide: MAT_DATE_LOCALE, useValue: 'he' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
