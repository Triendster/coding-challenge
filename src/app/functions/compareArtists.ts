import { environment } from "../environments/environment";

export async function compareArtists(artistSearchString: string) : Promise<Array<any>> {
    const API_KEY = environment.API_KEY;
    const compareArtistURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=10&artist=${encodeURIComponent(artistSearchString)}&api_key=${API_KEY}&format=json`;
    let returnVal: Array<any> = [];


    try {
        const compareArtistResponse = await fetch(compareArtistURL);
        const compareArtistResults = await compareArtistResponse.json();

        returnVal = compareArtistResults.similarartists.artist;
        
        return returnVal;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}