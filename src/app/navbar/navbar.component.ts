import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ArtistInfo } from '../interfaces/artistInfo.interface';
import { getArtistInfo } from '../functions/getArtistInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  private API_KEY: string = environment.API_KEY;
  public searchResults: any;
  public showDropdown: boolean = false;
  public artistInfo: ArtistInfo = {name: '', plays: 0, listeners: 0, summary: '', albums: [], tracks: []};

  constructor(private http: HttpClient) { }

  @Output () artistSelected = new EventEmitter<ArtistInfo>();

  onInputChange(event: any) {
    const artistSearchString: string = event.target.value;
    const searchArtistURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.search&limit=10&artist=${encodeURIComponent(artistSearchString)}&api_key=${this.API_KEY}&format=json`;

    if (artistSearchString) {
      this.http.get(searchArtistURL).subscribe((data: any) => {
        this.searchResults = data.results.artistmatches.artist;
        this.showDropdown = true;
      });
    } else {
      this.showDropdown = false;
      this.searchResults = [];
    }
  }

  onClickSearchResult(artistName: string) {
    getArtistInfo(artistName).then(data => {
      this.artistInfo = data;
      this.artistSelected.emit(this.artistInfo);
    })
  }
}
