import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const AlbumDetails = ({ albums }) => {

  const urlParams = useParams();
  
  const [albumDetails, setAlbumDetails] = useState( albums.filter(album => album.id === parseInt(urlParams.id))[0] );


  useEffect(() => {
    const getAlbumInfo = async () => {
      const response = await fetch(albumDetails.master_url, { mode: 'cors' });
      const albumInfo = await response.json();
      setAlbumDetails(
        {
          ...albumDetails,
          artist: albumInfo.artists[0].name,
          tracklist: albumInfo.tracklist,
          albumTitle: albumInfo.title,
          relatedAlbums: albums.filter(album => album.genre.includes(albumDetails.genre[0])),
        }
      );
    };

    getAlbumInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="album-page">
      <div className="album-page__details">
        <div className="album-page__details--album-img-wrapper">
          <img src={albumDetails.cover_image} alt={albumDetails.albumTitle} className="album-page__album-img" />
        </div>
        <div className="album-page__details--main-info-wrapper">
          <span className="album-page__details--album-name">{albumDetails.albumTitle}</span>
          <span className="album-page__details--artist-name">{albumDetails.artist}</span>
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