import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{
  results: any;
  searchQuery: string = "";
  searchSub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.searchQuery = params['q'];
      this.musicData.searchArtists(this.searchQuery).subscribe(musicdatasevice=>{
        this.results = musicdatasevice.artists.items.filter((artist:any)=>{
          return artist.images.length > 0 ;     
        })       
      })
    })
  }
}