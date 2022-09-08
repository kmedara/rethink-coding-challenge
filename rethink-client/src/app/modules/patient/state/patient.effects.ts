import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map, switchMap,
  tap
} from 'rxjs/operators';
import { SnackBarService } from './../../core/services/snackbar.service';
import { PatientService } from './..//services/patient.service';
import * as actions from './patient.actions';
@Injectable()
export class PatientEffects {
  constructor(private actions$: Actions, private patientService: PatientService, private snackbar: SnackBarService) { }
  
  
  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadPatients),
      switchMap((action) =>
        this.patientService.get(action.payload).pipe(
          map((response) => { console.log(response); return actions.patientsLoaded(response) }),
         //catchError((err) => of(actions.failure(err)))
        )
      )
    )
  );

  updatePatient$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.updatePatient),
    switchMap((action) => 
      this.patientService.update(action.payload).pipe(
        map((response) => { console.log(response); return actions.patientUpdated(response) }),
        //catchError((err) => of(actions.failure(err)))
      )
    )
  ))

  deletePatient$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.deletePatient),
    switchMap((action) => 
      this.patientService.delete(action.payload).pipe(
        map((response) => { console.log(response); return actions.patientDeleted( action.payload ) }),
        //catchError((err) => of(actions.failure(err)))
      )
    )
  ))

  uploadCsv$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.uploadCSV),
    switchMap((action) => 
      this.patientService.uploadCSV(action.payload).pipe(
        map((response) => { console.log(response); return actions.csvUploaded( ) }),
        //catchError((err) => of(actions.failure(err)))
      )
    )
  ))

  csvUploaded$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.csvUploaded),
    switchMap((action) => of({}).pipe(
      map((response) => actions.loadPatients({}))
    )
      //this.patientService.uploadCSV().pipe(
        //map((response) => { console.log(response); return actions.csvUploaded( ) }),
        //catchError((err) => of(actions.failure(err)))
      //)
    )
  ))

  /**
   * TODO: Currently causing a memory leak :)
   */
  failure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.failure),
      tap((action) => this.snackbar.error(action.payload))
    ), { dispatch: false})
}
