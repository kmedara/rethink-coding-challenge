import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SnackBarService } from './modules/core/services/snackbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnackBarService]
})
export class AppComponent {
  title = 'rethink-client';
}
