import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {DiscoveredPageRoutingModule} from './discovered-routing.module';

import {DiscoveredPage} from './discovered.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoveredPageRoutingModule
  ],
  declarations: [DiscoveredPage]
})
export class DiscoveredPageModule {
}
