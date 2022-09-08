import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { ActionsUnion, footer, sidenav } from './layout.actions';

export const initialState = {
  sidenav: null as unknown as boolean,
  footer: true
}
export type LayoutState = typeof initialState;
export const reducer = createReducer(
  initialState,
  on(sidenav, state => ({...state, sidenav: !state.sidenav})),
)
