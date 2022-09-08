import { Component, Input } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";
import { PatientService } from "src/app/modules/patient/services/patient.service";

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
  constructor(private _service: PatientService) { }

  onFileSelected(event: Event) {

    const files = (event?.target as HTMLInputElement)?.files;
    if (files && files[0]) {
      const file = files[0]

      this.fileName = file.name;

      //const formData = new FormData();

      //formData.append("File", file, file.name);

      this._service.uploadCSV(file).pipe(finalize(() => this.reset()), takeUntil(this.cancel$)).subscribe();
    }
    //const file:File = event?.target?.files[0];

    // if (file) {

    //     this.fileName = file.name;

    //     const formData = new FormData();

    //     formData.append("thumbnail", file);

    //const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //const upload$ = this._service.uploadCSV(formData);

    // 
  }

  cancelUpload() {
    this.cancel$.next()
  }

  reset() {
    this.uploadProgress = 0;
  }
}