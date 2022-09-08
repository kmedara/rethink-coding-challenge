import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { catchError, skip, takeUntil } from "rxjs/operators";
import { PatientFilter } from "../core/api/api.routes";
import { IPatient } from "./models/patient.model";
import { deletePatient, loadPatients, resetState, updatePatient } from "./state/patient.actions";
import { PatientState } from "./state/patient.reducer";
import { selectCount, selectPatients } from "./state/patient.selectors";

/**
 * @description - typed fn used to manipulate values in edit table
 */
export type DataSourceFn = (forms: FormGroup, i: number) => void;
/**
 * @description Custom Angular CDK Datasource
 * https://blog.angular-university.io/angular-material-data-table/
 */
export class PatientsDataSource implements DataSource<AbstractControl<any, any>> {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private lengthSubject$ = new BehaviorSubject<number>(0);
    private complete$ = new Subject();
    private patients$ = this.store.select(selectPatients)
    private _filter: PatientFilter = { skip: 0, take: 0, sortDirection: 'desc'};
    public loading$ = this.loadingSubject.asObservable();
    public length$ = this.store.select(selectCount);
    public editFormControls = new BehaviorSubject<AbstractControl<any, any>[]>([]);
    editForm!: FormGroup;
    constructor(private store: Store<PatientState>, private _fb: FormBuilder, private _formBuilder: FormBuilder) {

        this.editForm = this._fb.group({
            editRows: this._fb.array([])
        });

        this.patients$.pipe(
            catchError(_ => of([])),
            skip(1),
            takeUntil(this.complete$)
        ).subscribe(el => {
            this.createEditableRows(el);
            this.lengthSubject$.next(el.length)
        })

    }

    connect(collectionViewer: CollectionViewer): Observable<AbstractControl<any, any>[]> {

        return this.editFormControls.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.patientsSubject.complete();
        this.loadingSubject.complete();
        this.complete$.next();
    }


    loadData(filter: PatientFilter) {
       this._filter = filter;
        this.store.dispatch(resetState());
        this.loadingSubject.next(true);
        this.store.dispatch(loadPatients(filter));
       
    }

    updatePatient(patient: IPatient) {
        this.store.dispatch(updatePatient(patient));
    }
    deletePatient(id: number, rowIndex: any) {
        this.store.dispatch(deletePatient(id));
    }

    private createEditableRows(arr: IPatient[]) {
        this.editForm = this._fb.group({
            editRows: this._fb.array(arr.map(val => this._fb.group({
                id: new FormControl(val.id),
                firstName: new FormControl(val.firstName),
                lastName: new FormControl(val.lastName),
                birthday: new FormControl(val.birthday),
                gender: new FormControl(val.gender, { nonNullable: true }),
                //action: new FormControl('existingRecord'),
                isEditable: new FormControl(false),
                isNewRow: new FormControl(false),
            })
            )) //end of fb array
        }); // end of form group cretation

        this.editFormControls.next((this.editForm.get('editRows') as FormArray).controls)
        this.loadingSubject.next(false)
    }

}