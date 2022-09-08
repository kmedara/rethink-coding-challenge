import { StoreModule } from '@ngrx/store';
import { reducer as layoutReducer } from '../app/modules/core/state/layout/layout.reducer';
import { reducer as patientReducer } from '../app/modules/patient/state/patient.reducer';
import { PatientState } from './modules/patient/state/patient.reducer';

export interface AppState {
patients: PatientState
}


export const rootStore = StoreModule.forRoot({layout: layoutReducer, patients: patientReducer }, {})
