import { createAction, union } from "@ngrx/store";
import { Paged, PatientFilter } from "../../core/api/api.routes";
import { IPatient } from "../models/patient.model";

export const ACTION_TYPES = {
  LOAD_PATIENTS: '[Patient] load Patients',
  PATIENTS_LOADED: '[Patient] Patients loaded',
  FAILURE: '[Patient] Action Failure',
  RESET_STATE: '[Patient] RESET STATE',
  UPDATE_PATIENT: '[Patient] UPDATE PATIENT',
  PATIENT_UPDATED: '[Patient] PATIENT UPDATED'
}
//export const updateEmail = createAction(ACTION_TYPES.UPDATE_EMAIL, (email = '@') => ({ payload: email }))
//export const updateAge = createAction(ACTION_TYPES.UPDATE_AGE)
export const loadPatients = createAction(ACTION_TYPES.LOAD_PATIENTS, (filter: PatientFilter) => ({ payload: filter }))
export const updatePatient = createAction(ACTION_TYPES.UPDATE_PATIENT, (patient: IPatient) => ({ payload: patient }))
export const patientsLoaded = createAction(ACTION_TYPES.PATIENTS_LOADED, (patients: Paged<IPatient>) => ({ payload: patients }))
export const patientUpdated = createAction(ACTION_TYPES.PATIENT_UPDATED, (patient: IPatient) => ({ payload: patient }))
export const resetState = createAction(ACTION_TYPES.RESET_STATE);
export const failure = createAction(ACTION_TYPES.FAILURE, (err: any) => ({ payload: err }))
export const actions = union({
  //updateEmail,
  //updateAge,
  loadPatients,
  patientsLoaded, failure
})
export type ActionsUnion = typeof actions


