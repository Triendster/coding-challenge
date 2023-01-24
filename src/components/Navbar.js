import "../css/Navbar.css";
import "../css/general.css";
import logo from "../logo.svg";
import { useState } from "react";
import DetailView from "./DetailView";

function Navbar() {
  /*
  Initialisierung von State-Variablen:

    -> counter        : um Anzahl der Suchen zu reduzieren
    -> searchResults  : Liste gesuchter Künstler
    -> open           : Sichtbarkeit von Modal-Dialog
    -> artistInfo     : Künstler-Info in Objekt-Form
    -> artistTracks   : Liste von Tracks in Objekt-Form
    -> artistAlbums   : Liste von Alben in Objekt-Form
    
  */
  const [counter, setCounter] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [artistInfo, setArtistInfo] = useState({});
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);

  /*
  Prozessvariablen:
    -> API_KEY        : benötigt für lastFM-API
  */
  const API_KEY = process.env.REACT_APP_API_KEY;

  //Eingabetaste löst keine Suche aus
  function handleSubmit(event) {
    event.preventDefault();
  }

  //Suche über artist.search API-Endpoint alle 3 Tastenanschläge durchführen
  //Liste möglicher Künstler in searchResults speichern
  function handleChange(event) {
    if ((counter + 1) % 3 === 0) {
      if (event.target.value !== "") {
        fetch(
          `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(
            event.target.value
          )}&api_key=${API_KEY}&format=json`
        )
          .then((response) => response.json())
          .then((data) => setSearchResults(data.results.artistmatches.artist));
        setCounter(0);
      }
    } else {
      setCounter(counter + 1);
    }
    if (event.target.value === "") {
      setSearchResults([]);
      setCounter(0);
    }
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

  //Modal-Dialog schließen
  function handleClose() {
    setOpen(false);
  }

  //JSX für Komponente
  //Essenziell sind hier die Event-Listener auf den List-Items
  return (
    <>
      <section className="relative">
        <nav className="fixed navbar">
          <div className="flexh align-center navbar-container">
            <div className="flexh align-center">
              <img
                alt="App Logo"
                src={logo}
                className="navbar-container-img"
              ></img>
              <p className="navbar-container-text">NTAG Coding Challenge</p>
            </div>
            <div className="flexh align-center navbar-search-section">
              <a className="navbar-container-anchor" href="#compare">
                Compare
              </a>
              <form className="flexh align-center" onSubmit={handleSubmit}>
                <input placeholder="Search For An Artist" onChange={handleChange} type="text"></input>
              </form>
            </div>
          </div>
        </nav>
        <div className="flexc navbar-search-results">
          <ul className="navbar-search-results-list">
            {searchResults.map((result, index) => {
              return (
                <li
                  className="navbar-search-results-list-item"
                  key={index}
                  onClick={() => handleClick(result.name)}
                >
                  {result.name}
                </li>
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

export default Navbar;
