import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersPage} from "./users.page";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/tabs/home',
    pathMatch: 'full'
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
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {
}
