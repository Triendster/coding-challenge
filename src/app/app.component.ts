import { Component } from '@angular/core';
import { ArtistInfo } from './interfaces/artistInfo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coding-challenge';

  public artistSelected: any;

  onArtistSelected(artistInfo: ArtistInfo) {
    this.artistSelected = artistInfo;
  }
}
