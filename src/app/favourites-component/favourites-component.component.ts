import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites-component',
  templateUrl: './favourites-component.component.html',
  styleUrls: ['./favourites-component.component.css']
})
export class FavouritesComponentComponent implements OnInit {
  favourites: Array<any> = [];
  favouritesSub: Subscription | undefined;

  constructor(private musicData: MusicDataService) { }

  removeFromFavourites(id: string){
    this.favouritesSub = this.musicData.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    })
  }

  ngOnInit(): void {
    this.favouritesSub = this.musicData.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
    })
  }

}