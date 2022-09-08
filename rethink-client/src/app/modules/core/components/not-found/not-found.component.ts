import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public router: Router,private route:ActivatedRoute ) { }

  ngOnInit(): void {
  }
  options: AnimationOptions = {
    path: 'assets/lottie/404-page.json',
  };
  nav = () => {
    this.router.navigateByUrl('/')
  }
  animationCreated(animationItem: AnimationItem): void {
    //console.log(animationItem);
  }

}
