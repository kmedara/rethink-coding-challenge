import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from '../../../../../assets/route-transition-animations';

@Component({
  selector: 'app-patient-container',
  templateUrl: './patient-container.component.html',
  styleUrls: ['./patient-container.component.scss'],
  animations: [
    slideInAnimation
  ],
})
export class PatientContainerComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
