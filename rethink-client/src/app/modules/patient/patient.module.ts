import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { PatientUploadComponent } from './components/patient-upload/patient-upload.component';
import { PatientContainerComponent } from './containers/patient-container/patient-container.component';
import { PatientRoutes } from './patient.routing';

import { PatientEffects } from './state/patient.effects';
@NgModule({
  declarations: [
    PatientContainerComponent,
    PatientDashboardComponent,
    PatientTableComponent,
    PatientUploadComponent
  ],
  imports: [
    CommonModule,
    PatientRoutes,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoreModule,
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class PatientModule { }
