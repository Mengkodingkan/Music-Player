import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserPage} from './user.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./playlist/playlist.module').then(m => m.PlaylistPageModule)
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'artists/:artistId',
            loadChildren: () => import('./artist-profile/artist-profile.module').then(m => m.ArtistProfilePageModule)
          }
        ],
      },
      {
        path: 'followed',
        loadChildren: () => import('./followed/followed.module').then(m => m.FollowedPageModule)
      },
      {
        path: '',
        redirectTo: '/user/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: 'privacy-security',
    loadChildren: () => import('./privacy-security/privacy-security.module').then(m => m.PrivacySecurityPageModule)
  },
  {
    path: '',
    redirectTo: '/user/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {
}
