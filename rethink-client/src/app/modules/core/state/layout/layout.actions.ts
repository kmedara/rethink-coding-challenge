import { Action, createAction, union } from "@ngrx/store";
export const sidenav = createAction('[Layout] sidenav')
export const footer = createAction('[Layout] footer')

const actions = union({
  sidenav,
  footer
})
export type ActionsUnion = typeof actions


