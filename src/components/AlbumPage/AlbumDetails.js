import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import QuantityInput from '../Shared/QuantityInput';
import RelatedAlbums from './RelatedAlbums';
import TrackList  from './TrackList';
import { dataChangeRequest } from '../../sevices/service';
import AlbumReviews from './AlbumReviews/AlbumsReviews';
import { UserContext } from '../../App';

const AlbumDetails = ({ 
    getAllAlbums, 
    quantity, 
    setQuantity, 
    handleQuantityChange, 
    addAlbumToCart, 
    incrementQuantity, 
    decrementQuantity,
    setNotification,
  }) => {

  const user = useContext(UserContext)
  const [albumDetails, setAlbumDetails] = useState(null);
  const urlParams = useParams();

  const convertToMinutesAndSeconds = (duration) => {
    const time = new Date(duration);
    const convertedTime = `${time.getMinutes()}:${time.getSeconds()}`;
    return convertedTime;
  }

  const removePunctuationAndWhiteSpace = (str) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const cleanedString = str.replace(regex, '');
    return cleanedString.replace(/\u2013|\u2014/g, '').split(' ').join('').toLowerCase();
  }

  const getAlbumTracks = async (albumInfo) => {
    let tracksInfo;
    const response = await fetch(`https://albumphoria.herokuapp.com/spotify/${albumInfo.title}`, {mode: 'cors'});
    const data = await response.json();
    const { items } = data.albums;
    const matchingAlbum = items.filter((album) => {
      const spotifyArtistName = removePunctuationAndWhiteSpace(album.artists[0].name);
      const discogsArtistName = removePunctuationAndWhiteSpace(albumInfo.artists[0].name);
      const spotifyAlbumName = removePunctuationAndWhiteSpace(album.name);
      const discogsAlbumName = removePunctuationAndWhiteSpace(albumInfo.title);   
      if (spotifyArtistName === discogsArtistName && spotifyAlbumName === discogsAlbumName) {
        return true;
      }
      return false;
    });

    if (matchingAlbum.length === 0) {
      tracksInfo = {
        tracklist: albumInfo.tracklist.map((track) => {
          const trackDetails = {
            id: track.position,
            name: track.title,
            preview: null,
            duration: track.duration,
            artists: albumInfo.artists,
            isPlaying: false,
          }
          return trackDetails;
        }),
        tracklistOrigin: 'discogs',
      }
      return tracksInfo;
    } else {
      const albumSpotifyId = matchingAlbum[0].id
      const tracklistResponse = await fetch(`https://albumphoria.herokuapp.com/spotify/${albumSpotifyId}/tracks`, {mode: 'cors'});
      const tracklistData = await tracklistResponse.json();
      tracksInfo = {
        tracklist: tracklistData.items.map((track) => {
          const trackDetails = {
            id: track.id,
            name: track.name,
            preview: track.preview_url !== null ? new Audio(track.preview_url) : track.preview_url,
            duration: convertToMinutesAndSeconds(track.duration_ms),
            artists: track.artists.map((artist) => {
              return {
                name: artist.name, id: artist.id
              }
            }),
            isPlaying: false,
          }
          return trackDetails;
        }),
        tracklistOrigin: 'spotify',
      };
      return tracksInfo;
    }
  }

  useEffect(() => {
    const setInitialAlbumDetails = async () => {
      const albums = await getAllAlbums();
      const chosenAlbum = albums.filter(album => album.id === parseInt(urlParams.id))[0];
      const response = await fetch(`https://albumphoria.herokuapp.com/discogs/releases/${chosenAlbum.id}`, { mode: 'cors'});
      const albumInfo = await response.json();
      const tracksInfo = await getAlbumTracks(albumInfo);
      setAlbumDetails(
        {
          ...chosenAlbum,
          artist: albumInfo.artists[0].name,
          tracklist: tracksInfo.tracklist,
          tracklistOrigin: tracksInfo.tracklistOrigin,
          albumTitle: albumInfo.title,
          relatedAlbums: albums.filter(album => album.genre.includes(chosenAlbum.genre[0]) && chosenAlbum.id !== album.id).slice(0, 20),        
        }
      );
    }

    const resetState = () => {
      setAlbumDetails(null);
      setQuantity(1);
    }

    setInitialAlbumDetails();
    return () => {
      resetState()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);


  const categoryMap = (categoriesArray, category) => {
    if (categoriesArray[categoriesArray.length - 1] === category) {
      return ` ${category}`;
    }
    return ` ${category},`;
  }

  const playTrack = (track) => {
    track.isPlaying = true;
    track.preview.play();
  }
  const pauseTrack = (track) => {
    track.isPlaying = false;
    track.preview.pause()
  }

  const togglePlaying = (clickedTrackID) => {
    setAlbumDetails({
      ...albumDetails,
      tracklist: albumDetails.tracklist.map((track) => {
        if (track.isPlaying && clickedTrackID === track.id) {
          pauseTrack(track);
        } else if (clickedTrackID === track.id) {
          playTrack(track);
        } else {
          pauseTrack(track);
        }
        return track;
      })
    });
  };

  const addAlbumToWishlist = async (albumDetails, token) => {
    const albumData = {
      title: albumDetails.albumTitle,
      price: parseFloat(albumDetails.price),
      thumb: albumDetails.thumb,
      albumId: albumDetails.id,
      dateAdded: Date.now(),
      comment: '',
      image: albumDetails.cover_image,
      artist: albumDetails.artist,
    }
    const response = await dataChangeRequest('https://albumphoria.herokuapp.com/wishlist', albumData, token, 'POST');
    if (!response.ok) {
      const data = await response.json();
      setNotification(data.error);
    } else {
      setNotification(`${albumData.title} has been added to your wishlist`)
    }
  }

  if (!albumDetails) {
    return (
      <div className="album-page">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="album-page">
      <div className="album-page__content">
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
              <span className="album-page__details--price">??{albumDetails.price}</span>
            </div>
            <div className="album-page__details--sub-info-wrapper">
              <span className="album-page__details--genres"><b>Genres:</b> {albumDetails.genre.map(genre => categoryMap(albumDetails.genre, genre) )}</span>
              <span className="album-page__details--styles"><b>Styles:</b> {albumDetails.style.map(style => categoryMap(albumDetails.style, style) )}</span>
            </div>
            <div className="album-page__details--prod-info">
              <span className="album-page__prod-detail">Format: {albumDetails.format[0]}</span>
              <span className="album-page__prod-detail">Labels: {albumDetails.label.map(labelName => categoryMap(albumDetails.label, labelName) )}</span>
              <span className="album-page__prod-detail">Barcode: {albumDetails.barcode[0]}</span>
            </div>
            <div className="album-page__details--album-purchase-wrapper">
              <QuantityInput 
                quantity={quantity} 
                incrementQuantity={incrementQuantity} 
                decrementQuantity={decrementQuantity} 
                handleQuantityChange={handleQuantityChange} 
                classNamePrefix='album-page__details'
              />
              <div className="album-page__details--album-btns-wrapper">
                <button onClick={(event) => addAlbumToCart(albumDetails, event)} className="album-page__details--purchase-btn">
                  Add To Cart
                  <i className="gg-shopping-cart"></i>
                </button>
                <button onClick={() => addAlbumToWishlist(albumDetails, user.token)} className="album-page__details--wishlist-btn">
                  Add To Wishlist
                  <i className="gg-gift"></i>
                </button>
              </div>
            </div>
          </div>  
        </div>
        <div className="album-page__extra">
          <TrackList albumDetails={albumDetails} togglePlaying={togglePlaying} urlParams={urlParams} setAlbumDetails={setAlbumDetails} pauseTrack={pauseTrack}  />
          <RelatedAlbums albumDetails={albumDetails} urlParams={urlParams} />
        </div>
        <AlbumReviews albumDetails={albumDetails} setNotification={setNotification} />
      </div>
    </div>
  );
}

export default AlbumDetails;