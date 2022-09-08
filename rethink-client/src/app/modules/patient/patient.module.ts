import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { PatientContainerComponent } from './containers/patient-container/patient-container.component';
import { PatientRoutes } from './patient.routing';
import { PatientEffects } from './state/patient.effects';
@NgModule({
  declarations: [
    PatientContainerComponent,
    PatientDashboardComponent,
    PatientTableComponent
  ],
  imports: [
    CommonModule,
    PatientRoutes,
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
    EffectsModule.forFeature([PatientEffects])
  ]
})
export class PatientModule { }
