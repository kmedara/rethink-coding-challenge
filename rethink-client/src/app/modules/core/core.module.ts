import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavigationComponent } from './components/navigation/navigation.component.spec';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    MainLayoutComponent,
    NavigationComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
     MatIconModule,
     MatButtonModule,
     RouterModule,
     HttpClientModule,
     MatTooltipModule,
     MatSidenavModule,
     MatSnackBarModule,
    LottieModule,
  ]
})
export class CoreModule { }
