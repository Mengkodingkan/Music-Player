import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AlbumsPageRoutingModule} from './albums-routing.module';

import {AlbumsPage} from './albums.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AlbumsPage]
})
export class AlbumsPageModule {
}
