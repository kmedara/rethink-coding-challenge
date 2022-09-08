import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PatientDashboardComponent implements OnInit {
  //patients$: Observable<IPatient[]> = new Observable() using custom data source to fetch instead :)
  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

}
