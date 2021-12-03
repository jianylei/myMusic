import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any = [];
  albumSub: Subscription | undefined;

  constructor(private snackBar: MatSnackBar, private musicData: MusicDataService, private route: ActivatedRoute) { }

  addToFavourites(trackID: string){
    this.musicData.addToFavourites(trackID).subscribe((success)=>{
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      console.log(success);
    },(error)=>{
      this.snackBar.open("Unable to add song to Favourites","Done",{duration:1500} );
      console.log(error);
    });
  }

  ngOnInit(): void {
    let params = this.route.snapshot.params["id"];

    this.albumSub = this.musicData.getAlbumById(params).subscribe(data => {
      this.album = data;
    })
  }

  ngOnDestroy(): void{
    this.albumSub?.unsubscribe();
  }
}