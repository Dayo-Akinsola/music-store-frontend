import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const TrackList = ({ albumDetails }) => {
  const [tracks, setTracks] = useState({tracklist: [], hasFullInfo: false});
  const [audio, setAudio] = useState(new Audio('https://p.scdn.co/mp3-preview/cb0aaa8d8e7cfd2391a6383e1b4be3bccea77d71?cid=d8652ef9c7f14c1a85aaec080a91e083'));
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => setPlaying(!playing);

  const convertToMinutesAndSeconds = (duration) => {
    const time = new Date(duration);
    const convertedTime = `${time.getMinutes()}:${time.getSeconds()}`;
    return convertedTime;
  }

  useEffect(() => {

  const getAlbumTracks = async () => {
    const response = await fetch(`http://localhost:3001/spotify/${albumDetails.albumTitle}`, {mode: 'cors'});
    const data = await response.json();
    const { items } = data.albums;
    const matchingAlbum = items.filter((album) => {
      if (album.artists[0].name === albumDetails.artist && album.name === albumDetails.albumTitle) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    playing ? audio.play() : audio.pause();

  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);


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
            <button onClick={togglePlaying} className="album-page__extra--track-preview-btn">
              {playing ? "Pause" : "Play"}
              <FontAwesomeIcon onClick icon={faPlayCircle} />
            </button>
            <audio className="album-page__extra--track-preview-audio" > 
            </audio>
          </div>
        ))}          
      </div>
    )
  }
  return null;
}

export default TrackList;