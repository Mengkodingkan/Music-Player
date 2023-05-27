import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArtistListPageRoutingModule} from './artist-list-routing.module';

import {ArtistListPage} from './artist-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistListPageRoutingModule
  ],
  declarations: [ArtistListPage]
})
export class ArtistListPageModule {
}
