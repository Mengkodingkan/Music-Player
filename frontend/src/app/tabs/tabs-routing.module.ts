import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'discovered',
        loadChildren: () => import('../discovered/discovered.module').then(m => m.DiscoveredPageModule)
      },
      {
        path: 'musics',
        loadChildren: () => import('../musics/musics.module').then(m => m.MusicsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/discovered',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/discovered',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
