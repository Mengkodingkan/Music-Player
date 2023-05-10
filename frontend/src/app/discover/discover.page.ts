import {Component, OnInit} from '@angular/core';
import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import topHits from '../../assets/mockdata/topHits.json';
import {Router} from "@angular/router";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  protected data = [
    {
      title: 'Recently played',
      albums: recentlyPlayed
    },
    {
      title: 'Top Music',
      albums: topHits
    },
  ];

  protected slideOption = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  }

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  openAlbum(album: any) {
    const titleEscaped = encodeURIComponent(album.title);
    this.router.navigateByUrl(`/tabs/discover/${titleEscaped}`).then(r => console.log(r));
  }

  getImageName(album: string) {
    return album.replace(/[A-Z]/g, function (char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  }
}
