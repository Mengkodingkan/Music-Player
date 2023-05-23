import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ArtistsService} from "../../../services/artists.service";
import {ArtistModel} from "../../../model/artist.model";
import {Subscription} from "rxjs";
import {AlbumModel} from "../../../model/album.model";

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.page.html',
  styleUrls: ['./artist-profile.page.scss'],
})
export class ArtistProfilePage implements OnInit {
  artist: ArtistModel;
  albums: AlbumModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private artistsService: ArtistsService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('artistId')) {
        this.navCtrl.navigateBack('/user/tabs/home');
        return;
      }

      // @ts-ignore
      this.artistsService.fetchArtistById(paramMap.get('artistId'))

    });

    this.artistsService.artist.subscribe(artist => this.artist = artist);
    this.artistsService.albums.subscribe(albums => this.albums = albums);
  }

}
