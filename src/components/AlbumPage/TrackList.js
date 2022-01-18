import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';


const TrackList = ({ albumDetails, urlParams }) => {
  const [tracks, setTracks] = useState({tracklist: [], hasFullInfo: false});
  const activeTrack = useRef();

  const { pathname } = useLocation();

  const playTrack = (track) => {
    track.isPlaying = true;
    track.preview.play();
  }
  const pauseTrack = (track) => {
    track.isPlaying = false;
    track.preview.pause()
  }

  const togglePlaying = (clickedTrackID) => {
    setTracks({
      tracklist: tracks.tracklist.map((track) => {
        if (track.isPlaying && clickedTrackID === track.id) {
          pauseTrack(track);
        } else if (clickedTrackID === track.id) {
          playTrack(track);
          activeTrack.current = track.preview;
        } else {
          pauseTrack(track);
        }
        return track;
      }),
      hasFullInfo: true,
    })
  }

  useEffect(() => {

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

    const getAlbumTracks = async () => {
      const response = await fetch(`http://localhost:3001/spotify/${albumDetails.albumTitle}`, {mode: 'cors'});
      const data = await response.json();
      const { items } = data.albums;
      const matchingAlbum = items.filter((album) => {
        const spotifyArtistName = removePunctuationAndWhiteSpace(album.artists[0].name);
        const discogsArtistName = removePunctuationAndWhiteSpace(albumDetails.artist);
        const spotifyAlbumName = removePunctuationAndWhiteSpace(album.name);
        const discogsAlbumName = removePunctuationAndWhiteSpace(albumDetails.albumTitle);   
        if (spotifyArtistName === discogsArtistName && spotifyAlbumName === discogsAlbumName) {
          return true;
        }
        return false;
      });
      if (matchingAlbum.length === 0) {
        setTracks({
          tracklist: albumDetails.tracklist,
          hasFullInfo: false,
        });
      } else {
        const albumSpotifyId = matchingAlbum[0].id
        const tracklistResponse = await fetch(`http://localhost:3001/spotify/${albumSpotifyId}/tracks`, {mode: 'cors'});
        const tracklistData = await tracklistResponse.json();
        setTracks({
          tracklist: tracklistData.items.map((track) => {
            const trackDetails = {
              id: track.id,
              name: track.name,
              preview: new Audio(track.preview_url),
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
          hasFullInfo: true,
        });
      }
    }
    getAlbumTracks();

    return (
      console.log('hello')
    )
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTracks({
      tracklist: tracks.tracklist.map((track) => {
        if (track.isPlaying) {
          pauseTrack(track);
        }
        return track;
      }),
      hasFullInfo: tracks.hasFullInfo,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);




  if (tracks.hasFullInfo) {
    return (
      <div className="album-page__extra--tracks-wrapper">
        {tracks.tracklist.map((track) => (
          <div className="album-page__extra--track-wrapper" key={track.id}>
            <div className="album-page__extra--track-details">
              <span className="album-page__extra--track-name"><b>Track:</b> {track.name}</span>
              <div className="album-page__extra--track-artists">
                <span className="album-page__extra--artists-label"><b>Artists: </b></span>
                <div className="album-page__extra--artists-names">
                  {track.artists.map(artist => (<span className="album-page__extra--artists-name" key={artist.id}>{artist.name}</span>) )}
                </div>
              </div>
            </div>
            <button onClick={(event) => togglePlaying(track.id, event)} className="album-page__extra--track-preview-btn">
              {track.isPlaying ? <FontAwesomeIcon icon={faPauseCircle} /> : <FontAwesomeIcon icon={faPlayCircle} /> }               
            </button>
            <audio onEnded={(event) => togglePlaying(track.id, event)} className="album-page__extra--track-preview-audio" > 
            </audio>
          </div>
        ))}          
      </div>
    )
  }
  return null;
}

export default TrackList;