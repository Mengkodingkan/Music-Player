import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/discover',
        pathMatch: 'full'
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: ':albumTitle',
            loadChildren: () => import('../album/album.module').then(m => m.AlbumPageModule)
          }
        ]
      },
      {
        path: 'musics',
        loadChildren: () => import('../musics/musics.module').then(m => m.MusicsPageModule)
      },

      {
        path: 'album',
        loadChildren: () => import('../album/album.module').then(m => m.AlbumPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
