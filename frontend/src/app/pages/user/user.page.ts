import {Component, OnInit, ViewChild} from '@angular/core';
import {IonProgressBar, IonTabs} from "@ionic/angular";
import {HowlerJsService} from "../../services/howler-js.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  constructor() {

  }

  ngOnInit() {

  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }

}
