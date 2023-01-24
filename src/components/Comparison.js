import "../css/general.css";
import "../css/Comparison.css";
import { useState } from "react";

function Comparison() {
  /*
  Initialisierung von State-Variablen:

    -> counter                    : um Anzahl der Suchen zu reduzieren
    -> searchResults              : Liste gesuchter Künstler
    -> similiarArtists            : Liste ähnlicher Künstler auf Basis von selectedArtist
    -> selectedArtist             : gewählter Künstler für Vergleichsgrundlage
    -> selectedSimiliarArtist     : Künstler-Info in Objekt-Form
    
  */
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [similiarArtists, setSimiliarArtists] = useState([]);
  const [selectedSimiliarArtist, setSelectedSimiliarArtist] = useState({});
  const [counter, setCounter] = useState(0);

  /*
  Prozessvariablen:
    -> API_KEY        : benötigt für lastFM-API
  */
 
  const API_KEY = process.env.REACT_APP_API_KEY;

  //Eingabetaste darf keine Suche beginnen
  function handleSubmit(event) {
    event.preventDefault();
  }

  //Alle 3 Tastenanschläge werden Suchergebnisse von searchResults überarbeitet
  //Absolut identisch zu Variante in Navbar
  //Metainformationen und Suchresultate werden gelöscht, wenn Eingabe gelöscht wird
  function handleChange(event) {
    if ((counter + 1) % 3 === 0) {
      if (event.target.value !== "") {
        fetch(
          `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(
            event.target.value
          )}&limit=10&api_key=${API_KEY}&format=json`
        )
          .then((response) => response.json())
          .then((data) => setSearchResults(data.results.artistmatches.artist));
        setCounter(0);
      }
    } else {
      setCounter(counter + 1);
    }
    //
    if (event.target.value === "") {
      setSearchResults([]);
      setSimiliarArtists([]);
      setSelectedArtist({});
      setSelectedSimiliarArtist({});
      setCounter(0);
    }
  }

  //Wähle Künstler aus Liste von searchResults
  //Lade Metainformationen des ausgewählten Künstlers in selectedArtist
  //Lade Liste ähnlicher Künstler in similiarArtists
  function selectArtist(name) {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        name
      )}&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setSelectedArtist(data.artist));
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(
        name
      )}&limit=10&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setSimiliarArtists(data.similarartists.artist));
  }

  //Lade Metainformationen des ausgewählten ähnlichen Künstlers in selectedSimiliarArtist
  function selectSimiliarArtist(name) {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        name
      )}&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => setSelectedSimiliarArtist(data.artist));
  }

  //JSX für Komponente
  //Essenziell auch hier wieder die event-listener auf input und list-items
  return (
    <>
      <section id='compare' className="relative comparison-section">
        <div className="flexc justify-center align-center comparison container">
          <div className="comparison-search-box">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Search For An Artist"
                type="text"
                onChange={handleChange}
              ></input>
            </form>
          </div>
          <div className="flexh comparison-results-box">
            <div className="comparison-results">
              <h1>Artist search results:</h1>
              <ul className="results-list">
                {searchResults.length !== 0 &&
                  searchResults.map((result, index) => {
                    return (
                      <li key={index} onClick={() => selectArtist(result.name)}>
                        {result.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="comparison-results">
              <h1>Similiar artists results:</h1>
              <ul className="results-list">
                {similiarArtists.length !== 0 &&
                  similiarArtists.map((result, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => selectSimiliarArtist(result.name)}
                      >
                        {result.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="flexh align-center comparison-metadata-box">
            <div className="flexc comparison-metadata">
              {selectedArtist !== undefined && (
                <>
                  <h1>
                    {selectedArtist.name !== undefined && selectedArtist.name}
                  </h1>
                  <p>
                    {selectedArtist.bio !== undefined &&
                      selectedArtist.bio.summary}
                  </p>

                  {selectedArtist.stats !== undefined && (
                    <>
                      <h1>Statistics:</h1>
                      <h2>Listeners: {selectedArtist.stats.listeners}</h2>
                      <h2>Plays: {selectedArtist.stats.playcount}</h2>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flexc comparison-metadata">
              {selectedSimiliarArtist !== undefined && (
                <>
                  <h1>
                    {selectedSimiliarArtist.name !== undefined &&
                      selectedSimiliarArtist.name}
                  </h1>
                  <p>
                    {selectedSimiliarArtist.bio !== undefined &&
                      selectedSimiliarArtist.bio.summary}
                  </p>

                  {selectedSimiliarArtist.stats !== undefined && (
                    <>
                      <h1>Statistics:</h1>
                      <h2>
                        Listeners: {selectedSimiliarArtist.stats.listeners}
                      </h2>
                      <h2>Plays: {selectedSimiliarArtist.stats.playcount}</h2>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Comparison;
