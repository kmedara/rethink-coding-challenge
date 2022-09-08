import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { uploadCSV } from "../../state/patient.actions";
import { PatientState } from "../../state/patient.reducer";

@Component({
  selector: 'app-patient-upload',
  templateUrl: "patient-upload.component.html",
  styleUrls: ["patient-upload.component.scss"]
})
export class PatientUploadComponent {

  @Input()
  requiredFileType: string = "";

  fileName = '';
  uploadProgress: number = 0;
  uploadSub!: Subscription;
  private cancel$ = new Subject<void>();
  constructor(private _store: Store<PatientState>) {
   }

  onFileSelected(event: any) {
    console.log(event)
    const files = (event?.target as HTMLInputElement)?.files;
    if (files && files[0]) {
      const file = files[0]
      this.fileName = file.name;
      this._store.dispatch(uploadCSV(file))//.pipe(finalize(() => this.reset()), takeUntil(this.cancel$))
    }
  }

  cancelUpload() {
    this.cancel$.next()
  }

  reset() {
    this.uploadProgress = 0;
  }
}