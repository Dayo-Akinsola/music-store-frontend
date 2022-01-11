import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const AlbumDetails = ({ albums }) => {

  const [albumDetails, setAlbumDetails] = useState(null);
  const urlParams = useParams();

  const getAlbumSet = async (style) => {
    const response = await fetch(`http://localhost:3001/${style}`, { mode: 'cors' });
    const data = await response.json()
    const albums = data.results; 
    return albums;
  }
  
  const getAllAlbums = async () => {
    const popStyleAlbums = await getAlbumSet('pop');
    const hiphopStyleAlbums = await getAlbumSet('hiphop');
    const jazzStyleAlbums = await getAlbumSet('jazz');

    return [].concat(popStyleAlbums, hiphopStyleAlbums, jazzStyleAlbums);
  }

  useEffect(() => {
    const setInitialAlbumDetails = async () => {
      const albums = await getAllAlbums();
      // setAlbumDetails(albums.filter(album => album.id === parseInt(urlParams.id))[0]);
      const chosenAlbum = albums.filter(album => album.id === parseInt(urlParams.id))[0];
      try {
        const response = await fetch(chosenAlbum.resource_url, { mode: 'cors' });
        const albumInfo = await response.json();
        setAlbumDetails(
          {
            ...chosenAlbum,
            artist: albumInfo.artists[0].name,
            tracklist: albumInfo.tracklist,
            albumTitle: albumInfo.title,
            relatedAlbums: albums.filter(album => album.genre.includes(chosenAlbum.genre[0])),        
          }
        )
      }
      catch(err) {
        console.log(err);
      }
     
    }

    setInitialAlbumDetails();
  }, []);


  if (!albums || !albumDetails) {
    return null;
  }

  return (
    <div className="album-page">
      <div className="album-page__details">
        <div className="album-page__details--album-img-wrapper">
          <img src={albumDetails.cover_image} alt={albumDetails.albumTitle} className="album-page__album-img" />
        </div>
        <div className="album-page__details--main-info-wrapper">
          {
            albumDetails.albumTitle ? 
            <span className="album-page__details--album-name">{albumDetails.albumTitle}</span>
            : <></>
          }
          {
            albumDetails.artist ?
            <span className="album-page__details--artist-name">{albumDetails.artist}</span>
            : <></>
          }
        </div>
        <div className="album-page__details--album-purchase-wrapper">
          <div className="album-page__details--quantity">
            <input type="number" step="1" min="1" name="quantity" value="1" inputMode='numeric' className="album-page__details--purchase-quantity" />
          </div>
          <button className="album-page__details--purchase-btn">Add To Cart</button>
        </div>
        <div className="album-page__details--sub-info-wrapper">
          <span className="album-page__details--genres">Genres: {albumDetails.genre.map(genre => ` ${genre}`)}</span>
          <span className="album-page__details--styles">Styles: {albumDetails.style.map(style => ` ${style}`)}</span>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;