import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MusicsPageRoutingModule} from './musics-routing.module';

import {MusicsPage} from './musics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicsPageRoutingModule
  ],
  declarations: [MusicsPage]
})
export class MusicsPageModule {
}
