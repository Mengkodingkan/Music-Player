import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "./playlist.service";
import {AlertController, IonItemSliding, ToastController} from "@ionic/angular";
import {HowlerJsService} from "../../../services/howler-js.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  data: any;
  alertMessage: any;
  currentSong: any;

  constructor(
    private playlistService: PlaylistService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private howler: HowlerJsService
  ) {
  }

  ngOnInit() {
    this.howler.currentSong.subscribe(song => this.currentSong = song);
    this.playlistService.fetchData();
    this.playlistService.data.subscribe(data => {
      this.data = data;
    });

  }

  ionViewWillEnter() {
    console.log(this.data);
  }


  async onDelete(song: any, itemSliding: IonItemSliding) {

    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: `Wanna remove the ${song.song_title} from liked songs?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            this.alertMessage = 'Alert canceled';
            itemSliding.close();
          },
        },
        {
          text: 'Oke gann',
          role: 'confirm',
          cssClass: 'delete',
          handler: () => {
            this.alertMessage = 'Song removed!';
            this.playlistService.deleteSong(song.song_id);
            itemSliding.close();
            this.toastCtrl.create({
              message: this.alertMessage,
              duration: 1500,
              position: 'bottom',
            }).then(toastEl => {
              toastEl.present();
            });

          },
        },
      ]
    });
    await alert.present();
  }

}
