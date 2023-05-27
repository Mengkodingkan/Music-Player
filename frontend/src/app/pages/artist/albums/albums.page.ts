import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CreateAlbumComponent} from "../create-album/create-album.component";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) {
  }

  ngOnInit() {
  }

  onCreateModal() {
    this.modalController
      .create({
        component: CreateAlbumComponent,
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resData => {
        console.log(resData.data, resData.role);
        if (resData.role === 'confirm') {
          console.log('BOOKED!')
        }
      })
  }

}
