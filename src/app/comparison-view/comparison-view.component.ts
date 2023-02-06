import { Component } from '@angular/core';
import { compareArtists } from '../functions/compareArtists';
import { getArtistInfo } from '../functions/getArtistInfo';
import { searchArtists } from '../functions/searchArtist';

@Component({
  selector: 'app-comparison-view',
  templateUrl: './comparison-view.component.html',
  styleUrls: ['./comparison-view.component.css']
})
export class ComparisonViewComponent {
  public artistSearchResults: Array<any> = [];
  public artistComparisonResults: Array<any> = [];
  public selectedArtist: any;
  public selectedComparedArtist: any;

  onInputChange(event: any) {
    searchArtists(event.target.value).then((data: any) => {
      this.artistSearchResults = data;
    })
  }

  selectArtist(artistName: string, mode: string) {
    if (mode === 'artist') {
      getArtistInfo(artistName).then((data: any) => {
        this.selectedArtist = data;
        compareArtists(artistName).then((data: any) => {
          this.artistComparisonResults = data;
        })
      })
    }

    if (mode === 'compare') {
      getArtistInfo(artistName).then((data: any) => {
        this.selectedComparedArtist = data;
      })
    }
  }
}
