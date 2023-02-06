import { environment } from "../environments/environment";

export async function searchArtists(artistSearchString: string) : Promise<Array<any>> {
    const API_KEY = environment.API_KEY;
    const searchArtistURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.search&limit=10&artist=${encodeURIComponent(artistSearchString)}&api_key=${API_KEY}&format=json`;
    let returnVal: Array<any> = [];

    if(!artistSearchString) {
        return returnVal;
    }
    
    try {
        const searchArtistResponse = await fetch(searchArtistURL);
        const searchArtistResults = await searchArtistResponse.json();

        returnVal = searchArtistResults.results.artistmatches.artist;
        
        return returnVal;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}