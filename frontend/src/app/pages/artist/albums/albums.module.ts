import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AlbumsPageRoutingModule} from './albums-routing.module';

import {AlbumsPage} from './albums.page';
import {CreateAlbumComponent} from "../create-album/create-album.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsPageRoutingModule
  ],
  declarations: [AlbumsPage, CreateAlbumComponent]
})
export class AlbumsPageModule {
}
