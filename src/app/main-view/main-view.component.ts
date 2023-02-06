import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../environments/environment';
import { getArtistInfo } from '../functions/getArtistInfo';
import { ArtistInfo } from '../interfaces/artistInfo.interface';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  public showCountryDropdown: boolean = false;
  public selectedCountry: string;
  public countryTopArtists: Array<string> = [];
  public artistInfo: ArtistInfo = {name: '', plays: 0, listeners: 0, summary: '', albums: [], tracks: []};
  private countries: Array<string> = ['germany', 'spain', 'france'];
  private API_KEY: string = environment.API_KEY;

  @Output() artistSelected = new EventEmitter<ArtistInfo>();

  constructor(private http: HttpClient) {
    this.selectedCountry = this.countries[Math.floor(this.countries.length * Math.random())];

    this.getCountryTopArtists(this.selectedCountry);
  }

  getCountryTopArtists(country: string) {
    const getCountryTopArtistURL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${encodeURIComponent(country)}&limit=10&api_key=${this.API_KEY}&format=json`;

    this.http.get(getCountryTopArtistURL).subscribe((data: any) => {
      this.countryTopArtists = data.topartists.artist.map((artist: any) => {return artist.name});
    })
  }

  onCountrySelected(country: string) {
    this.selectedCountry = country;
    this.getCountryTopArtists(country);
  }

  onArtistSelected(artist: string) {
    getArtistInfo(artist).then((data: any) => {
      this.artistInfo = data;
      this.artistSelected.emit(this.artistInfo);
    })
  }

  showDropdown() {
    this.showCountryDropdown = true;
  }

  hideDropdown() {
    this.showCountryDropdown = false;
  }
}
