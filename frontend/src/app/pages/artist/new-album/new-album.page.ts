import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoadingController, ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AlbumService} from "../../../services/artist/album.service";
import {AlbumModel} from "../../../model/album.model";

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.page.html',
  styleUrls: ['./new-album.page.scss'],
})
export class NewAlbumPage implements OnInit {
  url: any;
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private albumService: AlbumService
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      title: new FormControl(null, {
        updateOn: 'blur'
      }),
      image: new FormControl(null, {
        updateOn: 'blur'
      })
    })
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onCreateAlbum() {
    this.loadingCtrl.create({
      message: 'Creating...'
    }).then(loadingEl => {
      loadingEl.present();

      let albumModel = new AlbumModel();
      albumModel.title = this.form.value.title;
      albumModel.image = this.form.value.image;
      albumModel.image = albumModel.image.replace(/^.*[\\\/]/, '');

      albumModel.publishDate = String(new Date().getFullYear());

      this.albumService.createAlbum(albumModel).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/artist/tabs/albums']);
      })
    });
  }
}
