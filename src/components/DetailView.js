import "../css/general.css";
import "../css/DetailView.css";
import Modal from "react-modal";

//Modal-Dialog zentrieren und auf 80% der Bildschirmbreite setzen
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
  },
};

//Setze Knotenpunkt, an dem das Modal-Dialog gekoppelt wird 
Modal.setAppElement("#root");

function DetailView(props) {
  //Methode als prop an dieses Kind weitergereicht ändert den Status
  //der State-Variable `open` in der Parent-Navbar-Komponente
  function closeModal() {
    props.onClose();
  }

  /*

  JSX für Komponente
  Komponente wird mit Informationen aus props beladen,
  bereitgestellt von Navbar:

    props.info    : Künstler-Metainformationen
    props.albums  : 5 meistgehörte Alben
    props.tracks  : 5 meistgehörte Tracks
    
  */
  return (
    <>
      <Modal
        isOpen={props.open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flexc justify-center modal-container">
          <h1>{props.info.name !== undefined && props.info.name}</h1>
          <p>{props.info.bio !== undefined && props.info.bio.summary}</p>
          <h1>Statistics:</h1>
          {props.info.stats !== undefined && (
            <>
              <h2>Listeners: {props.info.stats.listeners}</h2>
              <h2>Plays: {props.info.stats.playcount}</h2>
            </>
          )}
          <div className="flexh modal-container-ta">
            <div className="flexc justify-center modal-container-ta-c">
              <h1>Top 5 Tracks</h1>
              <ul>
                {props.tracks.map((track, index) => {
                  return (
                    <li key={index}>
                      {track.name} - {track.playcount} plays
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flexc modal-container-ta-c">
              <h1>Top 5 Albums</h1>
              <ul>
                {props.albums.map((album, index) => {
                  return (
                    <li key={index}>
                      {album.name} - {album.playcount} plays
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DetailView;
