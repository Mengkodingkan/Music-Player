import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-request-song',
  templateUrl: './request-song.component.html',
  styleUrls: ['./request-song.component.scss'],
})
export class RequestSongComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
