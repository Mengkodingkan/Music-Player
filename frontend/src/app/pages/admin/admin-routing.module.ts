import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminPage} from './admin.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AdminPage,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListPageModule)
      },
      {
        path: 'artists',
        loadChildren: () => import('./artist-list/artist-list.module').then(m => m.ArtistListPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin/tabs/dashboard',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {
}
