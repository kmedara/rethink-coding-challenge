import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from '../../../../../assets/route-transition-animations';
import { LayoutService } from '../../services/layout.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideInAnimation
  ]

})
export class MainLayoutComponent implements OnInit {


  constructor(private layoutService: LayoutService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

  }
  toggleDrawer = () => {
    this.layoutService.toggleSideNav()
  }
  // accountSettings = () => {
  //   console.log(this.route)
  //   this.router.navigate(['account-settings'],{ relativeTo: this.route.firstChild})
  // }
}
