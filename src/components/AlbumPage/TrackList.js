import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';


const TrackList = ({ albumDetails, togglePlaying, setAlbumDetails, pauseTrack }) => {


  useEffect(() => {
    const stopTracks = () => {
      setAlbumDetails({
        ...albumDetails,
        tracklist: albumDetails.tracklist.map((track) => {
          if (track.isPlaying) {
            pauseTrack(track);
          }
          return track;
        })
      });
    }

    return () => {
      stopTracks();
      setAlbumDetails(null);
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="album-page__extra--tracks-wrapper">
      <h3 className="album-page__extra--tracks-heading">Album Tracks</h3>
      {albumDetails.tracklist.map((track) => (
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
          {
            track.preview === null 
              ? 
              <span className="album-page__extra--track-preview-false"> Preview Not Availiable</span> 
              :
              <>
              <button onClick={(event) => togglePlaying(track.id, event)} className={`preview-btn album-page__extra--${track.isPlaying ? 'pause-btn' : 'play-btn'}`} ></button>
              <audio className="album-page__extra--track-preview-audio" > </audio>
              </>
          }
        </div>
      ))}          
    </div>
  )  
}

export default TrackList;