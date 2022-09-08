import { BreakpointObserver } from '@angular/cdk/layout';
import { ActionsUnion } from './../state/layout/layout.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from '../state/layout/layout.actions'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LayoutState } from '../state/layout/layout.reducer';

export const CustomBreakpointNames = {
  extraSmall: 'extraSmall',
  extraLarge: 'extraLarge',
  small: 'small'
}
interface IBreakpoints {
  [key:string]: string
}

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  activeBreakpoints: string[] = [];

  breakpoints: IBreakpoints = {
    '(max-width: 220px)': CustomBreakpointNames.extraSmall,
    '(max-width: 440px)': CustomBreakpointNames.small,
    '(min-width: 2400px)': CustomBreakpointNames.extraLarge
  };

  constructor(private store: Store<LayoutState>, private observer: BreakpointObserver) { }

  toggleSideNav() {
    this.store.dispatch(Actions.sidenav())
  }

  subscribeToLayoutChanges(): Observable<string[]> {
    return this.observer
      .observe(this.getBreakpoints())
      .pipe(map((observeResponse) => this.parseBreakpointsResponse(observeResponse.breakpoints)));
  }

  getBreakpoints(): string[] {
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue: string | number): string {
    return this.breakpoints[breakpointValue];
  }

  parseBreakpointsResponse(breakpoints:any): string[] {
    this.activeBreakpoints = [];

    Object.keys(breakpoints).map((key) => {
      if (breakpoints[key]) {
        this.activeBreakpoints.push(this.getBreakpointName(key));
      }
    });

    return this.activeBreakpoints;
  }

  isBreakpointActive(name: string) {
    return this.activeBreakpoints.find(breakpoint => breakpoint === name);
  }

}
