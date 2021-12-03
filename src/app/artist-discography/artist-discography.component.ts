import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: any = [];
  artist: any = {};
  artistSub: Subscription | undefined;
  albumSub: Subscription | undefined;
  imageURL: String = ""

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    let params = this.route.snapshot.params["id"];

    this.artistSub = this.musicData.getArtistById(params).subscribe(data => {
      this.artist = data;
    })

    this.albumSub = this.musicData.getAlbumsByArtistId(params).subscribe(data => {
      this.albums = data.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase()
      === curValue.name.toUpperCase()) === index)
    })
  }

  ngOnDestroy(): void{
    this.artistSub?.unsubscribe();
    this.albumSub?.unsubscribe();
  }
}