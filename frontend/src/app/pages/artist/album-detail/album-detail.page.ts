import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {RequestSongComponent} from "../request-song/request-song.component";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
})
export class AlbumDetailPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
  }

  onCreateModal() {
    this.modalCtrl
      .create({
        component: RequestSongComponent,
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
