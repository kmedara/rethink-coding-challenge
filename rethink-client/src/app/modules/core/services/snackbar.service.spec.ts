import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snackbar.service';


describe('SnackbarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
