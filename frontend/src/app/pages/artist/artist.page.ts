import {Component, ViewChild} from '@angular/core';
import {IonTabs, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  onLogout() {
    this.loadingCtrl.create({
      message: 'Logging out'
    }).then(loadingEl => {
      loadingEl.present();
      localStorage.removeItem('token');
      setTimeout(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('/login');
      }, 1500);
    });
  }
}
