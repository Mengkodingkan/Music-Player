import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {AlbumModel} from "../../../model/album.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Howl} from "howler";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-request-song',
  templateUrl: './request-song.component.html',
  styleUrls: ['./request-song.component.scss'],
})
export class RequestSongComponent implements OnInit {
  @Input() album: AlbumModel;

  form: FormGroup;
  howl: Howl;
  fileName: string;

  constructor(
    private modalCtrl: ModalController,
    private apiArtist: ApiArtistService,
    private loadingCtrl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur'
      }),
      audio: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onRequestSong() {
    this.fileName = this.form.value.audio.replace(/^.*[\\\/]/, '');
    this.howl = new Howl({
      src: [this.fileName]
    } as any);

    this.loadingCtrl.create({
      message: 'Requesting song'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        loadingEl.dismiss();

        let songModel = new SongModel();
        songModel.title = this.form.value.title;
        songModel.url = this.fileName;
        // songModel.duration = Math.ceil(this.howl.duration());
        // songModel.albumTitle = this.album.title;
        songModel.albumImage = this.album.image;

        this.apiArtist.createSong(this.album.id, songModel).subscribe();


        this.modalCtrl.dismiss({
          message: 'Song requested successfully'
        }, 'confirm');
      }, 1500);
    });
  }
}
