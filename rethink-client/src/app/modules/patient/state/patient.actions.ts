import { createAction, union } from "@ngrx/store";
import { Paged, PatientFilter } from "../../core/api/api.routes";
import { IPatient } from "../models/patient.model";

export const ACTION_TYPES = {
  LOAD_PATIENTS: '[Patient] load Patients',
  PATIENTS_LOADED: '[Patient] Patients loaded',
  FAILURE: '[Patient] Action Failure',
  RESET_STATE: '[Patient] RESET STATE',
  UPDATE_PATIENT: '[Patient] UPDATE PATIENT',
  PATIENT_UPDATED: '[Patient] PATIENT UPDATED',
  DELETE_PATIENT: '[Patient] DELETE PATIENT',
  PATIENT_DELETED: '[Patient] PATIENT DELETED',
  UPLOAD_CSV: '[Patient] UPLOAD CSV',
  CSV_UPLOADED: '[Patient] CSV UPLOADED',
  FILTER_CHANGE: '[Patient] FILTER CHANGE'
}
//export const updateEmail = createAction(ACTION_TYPES.UPDATE_EMAIL, (email = '@') => ({ payload: email }))
//export const updateAge = createAction(ACTION_TYPES.UPDATE_AGE)
export const loadPatients = createAction(ACTION_TYPES.LOAD_PATIENTS, (filter: PatientFilter) => ({ payload: filter }))
export const search = createAction(ACTION_TYPES.FILTER_CHANGE, (filter: PatientFilter) => ({ payload: filter}))
export const updatePatient = createAction(ACTION_TYPES.UPDATE_PATIENT, (patient: IPatient) => ({ payload: patient }))
export const deletePatient = createAction(ACTION_TYPES.DELETE_PATIENT, (id: number) => ({ payload: id }))
export const patientDeleted = createAction(ACTION_TYPES.PATIENT_DELETED, (id: number) => ({ payload: id }));
export const patientsLoaded = createAction(ACTION_TYPES.PATIENTS_LOADED, (patients: Paged<IPatient>) => ({ payload: patients }))
export const patientUpdated = createAction(ACTION_TYPES.PATIENT_UPDATED, (patient: IPatient) => ({ payload: patient }))
export const uploadCSV = createAction(ACTION_TYPES.UPLOAD_CSV, (file: File) => ({ payload: file }))
export const csvUploaded = createAction(ACTION_TYPES.CSV_UPLOADED)
export const resetState = createAction(ACTION_TYPES.RESET_STATE);
export const failure = createAction(ACTION_TYPES.FAILURE, (err: any) => ({ payload: err }))
export const actions = union({
  //updateEmail,
  //updateAge,
  loadPatients,
  patientsLoaded, failure,
  deletePatient
})
export type ActionsUnion = typeof actions


