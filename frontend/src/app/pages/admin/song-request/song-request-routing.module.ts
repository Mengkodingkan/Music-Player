import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SongRequestPage} from './song-request.page';

const routes: Routes = [
  {
    path: '',
    component: SongRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongRequestPageRoutingModule {
}
