import { SortDirection } from "@angular/material/sort";
import { environment } from "src/environments/environment";
import { IPatient } from "../../patient/models/patient.model";

/**
* used for typing api query and body parameters
* makes all keys of an object optional and requires them to be type T or T[]
*/
export type ApiFilter<T> = Partial<{[key in keyof T]: string | number | boolean | (string | number | boolean)[]}>
export type Paging = {
    skip: number,
    take: number,
    sortDirection: SortDirection
}

export type Paged<T> = {
    total: number,
    data: T[]
}
/**
 * Domain Filters
 */
export type PatientFilter = ApiFilter<IPatient> & Paging




export const API_ROUTES = {
    Patient: {
        Get: () => `${environment.patient_api}/patient`,
        Update: (id: number) => `${environment.patient_api}/patient/${id}`
    }
  }