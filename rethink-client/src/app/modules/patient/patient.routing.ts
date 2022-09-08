import { Route, RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientContainerComponent } from './containers/patient-container/patient-container.component';
// import { UserNavigationComponent } from './components/user-navigation/user-navigation.component';

const root: Route = {
  path: '',
  component: PatientContainerComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: PatientDashboardComponent
      // children: [
      //   {
      //     path: '',
      //     redirectTo: 'dashboard',
      //     pathMatch: 'prefix',
      //   },
      //   {
      //     path: 'dashboard',
      //     component: PatientDashboardComponent,
      //   },
      //   // {
      //   //   path: 'account-settings',
      //   //   component: AccountSettingsComponent,
      //   // },
      // ],
    },
  ],
};

const routes: Routes = [
  root,
  // {
  //   path: '',
  //   component: UserSystemOptionsComponent,
  //   outlet: 'system-options',
  // },
  // {
  //   path: '',
  //   component: UserNavigationComponent,
  //   outlet: 'site-navigation',
  // },
];

export const PatientRoutes = RouterModule.forChild(routes);
