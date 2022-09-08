import { createReducer, on } from '@ngrx/store';
import { IPatient } from '../models/patient.model';
import { loadPatients, patientsLoaded, patientUpdated, resetState } from './patient.actions';
export const initialState = {
  patients: [] as IPatient[],
  total: 0
}
export type PatientState = typeof initialState
export const reducer = createReducer(
  initialState,
  // on(updateEmail, (state, action) => ({...state, patient: { ...state.patient, email: action.payload}})),
  on(patientsLoaded, (state, action) => ({ ...state, patients: action.payload.data, total: action.payload.total })),

  on(resetState, () => initialState),

  on(patientUpdated, (state, action) => {
    var i = state.patients.findIndex(el => el.id == action.payload.id)
    var copy = [...state.patients];
    copy[i] = action.payload
    return { ...state, patients: copy }
  }),

  on(loadPatients, (state, action) => {
    return { ...state, patients: [] }
  })

  // on(patientDeleted, (state, action) => {
  //   // console.log(action.payload)
  //   // console.log(state.patients)
  //   // var i = state.patients.findIndex(el => el.id == action.payload)
  //   // console.log("deleted ", i);
  //    return { ...state }
  // }),

  // on(csvUploaded, (state, action) => {
  //   store
  //    return { ...state }
  // })

)
