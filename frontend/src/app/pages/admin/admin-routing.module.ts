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
        children: [
          {
            path: '',
            loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListPageModule)
          },
          {
            path: ':userId',
            loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailPageModule)
          }
        ]
      },
      {
        path: 'artists',
        children: [
          {
            path: '',
            loadChildren: () => import('./artist-list/artist-list.module').then(m => m.ArtistListPageModule)
          },
          {
            path: ':artistId',
            loadChildren: () => import('./artist-detail/artist-detail.module').then(m => m.ArtistDetailPageModule)
          }
        ]
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
