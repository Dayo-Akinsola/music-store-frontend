import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuantityInput from '../QuantityInput';
import RelatedAlbums from './RelatedAlbums';
import TrackList  from './TrackList';

const AlbumDetails = ({ setAlbumPrices, quantity, setQuantity, handleQuantityChange, addAlbumToCart, incrementQuantity, decrementQuantity }) => {

  const [albumDetails, setAlbumDetails] = useState(null);
  const urlParams = useParams();

  useEffect(() => {
    const setInitialAlbumDetails = async () => {
      const albums = await setAlbumPrices();
      const chosenAlbum = albums.filter(album => album.id === parseInt(urlParams.id))[0];
      const response = await fetch(`http://localhost:3001/discogs/${chosenAlbum.type}s/${chosenAlbum.id}`, { mode: 'cors'});
      const albumInfo = await response.json();
      setAlbumDetails(
        {
          ...chosenAlbum,
          artist: albumInfo.artists[0].name,
          tracklist: albumInfo.tracklist,
          albumTitle: albumInfo.title,
          relatedAlbums: albums.filter(album => album.genre.includes(chosenAlbum.genre[0]) && chosenAlbum.id !== album.id),        
        }
      );
    }

    const resetState = () => {
      setAlbumDetails(null);
      setQuantity(1);
    }

    setInitialAlbumDetails();

    return (
      resetState()
    )
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

  if (!albumDetails) {
    return null;
  }

  const categoryMap = (categoriesArray, category) => {
    if (categoriesArray[categoriesArray.length - 1] === category) {
      return ` ${category}`;
    }
    return ` ${category},`;
  }

  return (
    <div className="album-page">
      <div className="album-page__details">
        <div className="album-page__details--album-img-wrapper">
          <img src={albumDetails.cover_image} alt={albumDetails.albumTitle} className="album-page__album-img" />
        </div>
        <div className="album-page__details--text">
          <div className="album-page__details--main-info-wrapper">
            {
              albumDetails.albumTitle ? 
              <h3 className="album-page__details--album-name">{albumDetails.albumTitle}</h3>
              : <></>
            }
            {
              albumDetails.artist ?
              <span className="album-page__details--artist-name">{albumDetails.artist}</span>
              : <></>
            }
          </div>
          <div className="album-page__details--price-wrapper">
            <span className="album-page__details--price">£{albumDetails.price}</span>
          </div>
          <div className="album-page__details--sub-info-wrapper">
            <span className="album-page__details--genres"><b>Genres:</b> {albumDetails.genre.map(genre => categoryMap(albumDetails.genre, genre) )}</span>
            <span className="album-page__details--styles"><b>Styles:</b> {albumDetails.style.map(style => categoryMap(albumDetails.style, style) )}</span>
          </div>
          <div className="album-page__details--album-purchase-wrapper">
            <QuantityInput 
              quantity={quantity} 
              incrementQuantity={incrementQuantity} 
              decrementQuantity={decrementQuantity} 
              handleQuantityChange={handleQuantityChange} 
              classNamePrefix='album-page__details'
            />
            <button onClick={(event) => addAlbumToCart(albumDetails, event)} className="album-page__details--purchase-btn">Add To Cart</button>
          </div>
        </div>
        <div className="album-page__extra">
          <TrackList albumDetails={albumDetails} urlParams={urlParams}  />
          <RelatedAlbums albumDetails={albumDetails} />
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;