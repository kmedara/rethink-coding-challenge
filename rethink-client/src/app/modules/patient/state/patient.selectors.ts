import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PatientState } from "./patient.reducer";

//'begin' state lookup
export const patientStateFeature = createFeatureSelector<PatientState>('patients');

export const selectPatients = createSelector(patientStateFeature, (state) => state.patients);
export const selectCount = createSelector(patientStateFeature, (state) => state.total);
