import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArtistPage} from './artist.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ArtistPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'albums',
        children: [
          {
            path: '',
            loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsPageModule)
          },
          {
            path: 'create-album',
            loadChildren: () => import('./create-album/create-album.module').then(m => m.CreateAlbumPageModule)
          }
        ]
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/artist/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistPageRoutingModule {
}
