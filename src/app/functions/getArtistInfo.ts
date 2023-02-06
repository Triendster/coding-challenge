import { environment } from "../environments/environment";
import { ArtistInfo } from "../interfaces/artistInfo.interface";

export async function getArtistInfo(artistName: string) : Promise<ArtistInfo> {
    const API_KEY = environment.API_KEY;
    const getArtistInfoURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${API_KEY}&artist=${encodeURIComponent(artistName)}&format=json`;
    const getArtistAlbumsURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=5&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
    const getArtistTracksURL: string = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&limit=5&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;

    let returnVal: ArtistInfo = {name: "", summary: "", plays: 0, listeners: 0, albums: [], tracks: []};

    try {
        const artistInfoResponse = await fetch(getArtistInfoURL);
        const artistInfoData = await artistInfoResponse.json();

        returnVal.name = artistInfoData.artist.name;
        returnVal.summary = artistInfoData.artist.bio.summary;
        returnVal.plays = artistInfoData.artist.stats.playcount;
        returnVal.listeners = artistInfoData.artist.stats.listeners;

        const artistAlbumsResponse = await fetch(getArtistAlbumsURL);
        const artistAlbumData = await artistAlbumsResponse.json();

        returnVal.albums = artistAlbumData.topalbums.album.map((album: any) => {return {name: album.name, playcount: album.playcount}});

        const artistTracksResponse = await fetch(getArtistTracksURL);
        const artistTrackData = await artistTracksResponse.json();

        returnVal.tracks = artistTrackData.toptracks.track.map((track: any) => {return {name: track.name, playcount: track.playcount, listeners: track.listeners}});

        return returnVal;
    } catch(error) {
        console.error(error);
        throw error;
    }
}