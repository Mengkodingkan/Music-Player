import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DiscoveredPage} from './discovered.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoveredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoveredPageRoutingModule {
}
