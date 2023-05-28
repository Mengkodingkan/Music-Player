import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NewAlbumPageRoutingModule} from './new-album-routing.module';

import {NewAlbumPage} from './new-album.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAlbumPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewAlbumPage]
})
export class NewAlbumPageModule {
}
