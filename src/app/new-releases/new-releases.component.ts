import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: any = [];
  releasesSub: Subscription | undefined;

  constructor(private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.musicData.getNewReleases().subscribe(data => {
      this.releases = data.albums.items;
    })
  }

  ngOnDestroy():void{
    this.releasesSub?.unsubscribe();
  }
}