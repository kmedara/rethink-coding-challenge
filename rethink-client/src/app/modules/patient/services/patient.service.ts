import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { API_ROUTES, Paged, PatientFilter } from '../../core/api/api.routes';
import { IPatient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {



  constructor(private http: HttpClient) { }

  get(filter: PatientFilter): Observable<Paged<IPatient>> {
    console.log("patient get")

    return this.http.get<Paged<IPatient>>(API_ROUTES.Patient.Get(), {
      params: filter
    }).pipe(
      timeout(30000),

    )
  }

  update(patient: IPatient): Observable<IPatient> {
    return this.http.put<IPatient>(API_ROUTES.Patient.Update(patient?.id!), patient).pipe(timeout(30000))
  }

  delete(id: number) {
    return this.http.delete<IPatient>(API_ROUTES.Patient.Delete(id!)).pipe(timeout(30000))
  }

  uploadCSV(file: File) {
    const formData: FormData = new FormData();
    formData.append("File", file, file.name)

    return this.http.post(API_ROUTES.Patient.UploadCsv(), formData, {
      reportProgress: true,
      observe: 'events',

    })

    // console.log(formData);
  }
}

