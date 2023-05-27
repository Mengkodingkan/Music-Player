import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SongRequestPageRoutingModule} from './song-request-routing.module';

import {SongRequestPage} from './song-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongRequestPageRoutingModule
  ],
  declarations: [SongRequestPage]
})
export class SongRequestPageModule {
}
