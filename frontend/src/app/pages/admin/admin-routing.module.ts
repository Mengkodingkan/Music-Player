import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminPage} from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'artist-list',
    loadChildren: () => import('./artist-list/artist-list.module').then(m => m.ArtistListPageModule)
  },
  {
    path: 'song-request',
    loadChildren: () => import('./song-request/song-request.module').then(m => m.SongRequestPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {
}
