import { useEffect, useState } from "react";
import "../css/general.css";
import "../css/MainView.css";
import DetailView from "./DetailView";

function MainView() {
  /*
  Initialisierung von State-Variablen:

    -> countries      : Liste der Länder für geo.gettopartists API-Endpoint
    -> country        : ausgewähltes Land für geo.gettopartists API-Endpoint
    -> artists        : erlangte Liste von Künstlern aus geo.gettopartists API-Endpoint
    -> open           : Sichtbarkeit von Modal-Dialog
    -> artistInfo     : Künstler-Info in Objekt-Form
    -> artistTracks   : Liste von Tracks in Objekt-Form
    -> artistAlbums   : Liste von Alben in Objekt-Form

  */
  const countries = ["Germany", "Spain", "France"];
  const [country, setCountry] = useState(
    countries[Math.floor(Math.random() * countries.length)]
  );
  const [artists, setArtists] = useState([]);
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistInfo, setArtistInfo] = useState({});
  const [open, setOpen] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  //Wenn Komponente mountet, führe geo.gettopartists API-Anfrage durch, lade Daten in artists
  useEffect(() => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&limit=10&country=${country}&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setArtists(data.topartists.artist));
  }, []);

  //Ändert sich country, sollen die artists neu geladen werden
  useEffect(() => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&limit=10&country=${country}&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setArtists(data.topartists.artist));
  }, [country]);

  //Ändere country durch Auswahl aus Dropdown-Menü
  function handleCountryChange(country) {
    setCountry(country);
  }

  //Modal-Dialog schließen
  function handleClose() {
    setOpen(false);
  }

  //Metainformationen über artist.getinfo API-Endpoint erlangen und artistInfo speichern
  //Alben und Tracks über artist.gettopxxx erlangen und in artistXXX speichern
  //Sichtbarkeit von Modal-Dialog über open setzen
  function handleClick(name) {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        name
      )}&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setArtistInfo(data.artist));
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(
        name
      )}&limit=5&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setArtistAlbums(data.topalbums.album));
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
        name
      )}&limit=5&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setArtistTracks(data.toptracks.track));
    setOpen(
      artistInfo !== undefined &&
        artistAlbums !== undefined &&
        artistTracks !== undefined
    );
  }

  //JSX für Komponente
  //Dropdown-Menü inklusive event-listener für country-Variable
  //Liste der 10 meistgehörten Künstler von country
  return (
    <>
      <section className="relative flexc main-section">
        <div className="dropdown">
          <button className="dropdown-btn">Select a country: </button>
          <div className="dropdown-content">
            <ul className="dropdown-list">
              <li key="german" onClick={() => handleCountryChange("Germany")}>
                Germany
              </li>
              <li key="spanish" onClick={() => handleCountryChange("Spain")}>
                Spain
              </li>
              <li key="french" onClick={() => handleCountryChange("France")}>
                France
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flexc align-center country-view">
          <h1 className="country-header">
            Top {artists.length} Artists: {country}
          </h1>
          <ul className="flexc align-center country-container">
            {[...Array(10).keys()].map((index) => {
              return (
                <>
                  {artists.length !== 0 && (
                    <li key={`${artists[index].mbid}`} onClick={() => handleClick(artists[index].name)}>
                      {index + 1}. {artists[index].name}
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </section>
      <DetailView
        open={open}
        onClose={handleClose}
        info={artistInfo}
        albums={artistAlbums}
        tracks={artistTracks}
      ></DetailView>
    </>
  );
}

export default MainView;
