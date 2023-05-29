import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'artist',
    loadChildren: () => import('./pages/artist/artist.module').then(m => m.ArtistPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
