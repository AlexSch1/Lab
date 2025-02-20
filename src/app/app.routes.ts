import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutes } from './shared/enums/app-routes';

export const routes: Routes = [
  {
    path: AppRoutes.Root,
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.Home,
        component: HomeComponent,
      },
      {
        path: AppRoutes.Root,
        redirectTo: AppRoutes.Home,
        pathMatch: 'full',
      },
    ],
  },
  { path: AppRoutes.Any, redirectTo: AppRoutes.Home, pathMatch: 'full' },
];
