import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TreatmentDetails } from '../Classes/TreatmentDetails';

@Injectable({
  providedIn: 'root'
})
export class TreatmentDetailsService {
 
    readonly V_API = environment.apiUrl+'/TreatmentDetails';

  constructor(private Http:HttpClient) { }
  GetAllTreatmentDetails(id:any): Observable<TreatmentDetails[]>{
    return this.Http.get<TreatmentDetails[]>(`${this.V_API}/${'GetAllTreatmentDetails'}/${id}`);
  }
  AddTreatmentDetails(newTreatmentDetails:TreatmentDetails): Observable<any>{
    return this.Http.post<any>(`${this.V_API}/${'AddTreatmentDetails'}` ,newTreatmentDetails);
  }
  //החזרת שלב הטיפול האחרון
  GetTreatmentDetailsByApplyState(id:any):Observable<TreatmentDetails>{
    
    return this.Http.get<TreatmentDetails>(`${this.V_API}/${'GetTreatmentDetailsByApplyState'}/${id}`);

  }
  
}
