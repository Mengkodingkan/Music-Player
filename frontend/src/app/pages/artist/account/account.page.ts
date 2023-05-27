import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  onButtonChange() {
    this.actionSheetCtrl.create({
      header: 'What You would change?',
      mode: 'ios',
      buttons: [
        {
          text: 'Change Picture',
          handler: () => this.onChangePicture()
        },
        {
          text: 'Change Name',
          handler: () => this.onChangeName()
        }, {
          text: 'Change Bio',
          handler: () => this.onChangeBio()
        }, {
          text: "Change Url's",
          handler: () => this.onChangeUrl()
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    }).then(r => {
      r.present();
    });
  }

  onChangePicture() {
    console.log('Change Picture')
  }

  onChangeName() {
    console.log('Change Name')
  }

  onChangeBio() {
    console.log('Change Bio')
  }

  onChangeUrl() {
    console.log('Change Url')
  }
}
