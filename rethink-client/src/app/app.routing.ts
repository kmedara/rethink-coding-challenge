import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/core/components/main-layout/main-layout.component';
import { NavigationComponent } from './modules/core/components/navigation/navigation.component.spec';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/patient/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./modules/patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: '',
          component: NavigationComponent,
          outlet: 'site-navigation',
        },
    ],
  },
  // {
  //   path: '',
  //   component: UnauthenticatedLayoutComponent,
  //   children: [
  //     {
  //       path: 'authenticate',
  //       loadChildren: async () =>
  //         (await import('./modules/authentication/authentication.module')).AuthenticationModule,
  //     },
  //   ],
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

export const AppRoutes = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
