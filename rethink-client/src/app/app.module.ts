import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import player from 'lottie-web';
import { LottieCacheModule, LottieModule } from 'ngx-lottie';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { rootStore } from './app.state';
import { CoreModule } from './modules/core/core.module';
import { SnackBarService } from './modules/core/services/snackbar.service';
import { PatientEffects } from './modules/patient/state/patient.effects';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutes,
    rootStore,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSnackBarModule,
    FlexLayoutModule,
    StoreDevtoolsModule.instrument(),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
    EffectsModule.forRoot([PatientEffects])
  ],
  providers: [SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
