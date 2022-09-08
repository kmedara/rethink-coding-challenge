import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Paged, PatientFilter } from '../../core/api/api.routes';
import { IPatient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  

  constructor(private http: HttpClient) { }

   get(filter: PatientFilter): Observable<Paged<IPatient>> {
    console.log("patient get")
    
   return this.http.get<Paged<IPatient>>(`${environment.patient_api}/patient`, {
    params: filter
   }).pipe(
      timeout(30000),
      
    )
  }

  update(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(`${environment.patient_api}/patient/${ patient.id }`, patient).pipe(timeout(30000))
  }
}

