import { useState ,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Album from '../ShopPage/Album';


const RelatedAlbums = ({  albumDetails }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedAlbums, setDisplayedAlbums] = useState([]);

  useEffect(() => {
    const setInitialShownAlbums = () => {
      const nextShownAlbums = [];
      albumDetails.relatedAlbums.map((album, index) => {
        if (index === currentIndex || index === currentIndex + 1) {
          nextShownAlbums.push(album);
        }
        return album;
      });
      setDisplayedAlbums(nextShownAlbums);
    }

    setInitialShownAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const relatedLength = (albumDetails.relatedAlbums.relatedLength % 2 === 0) ? albumDetails.relatedAlbums.length : albumDetails.relatedAlbums.length - 1;
  const moveDisplayForward = () => {
    setCurrentIndex((currentIndex + 2) % relatedLength);    
  }

  const moveDisplayBackward = () => {
    const newCurrentIndex = currentIndex - 2;
    setCurrentIndex(((newCurrentIndex % relatedLength) + relatedLength) % relatedLength);
  }

  return (
    <div className="album-page__extra--related-wrapper">
      <h3 className="album-page__extra--related-heading">Albums You Might Like</h3>
      <div className="album-page__extra--related-albums">
        {displayedAlbums.map(album => <Album album={album} key={album.id}/>  )}
      </div>
      <div className="album-page__extra--nav-arrows">
        <span className="album-page__extra--left-arrow">
          <FontAwesomeIcon icon={faAngleLeft} onClick={moveDisplayBackward} />
        </span>
        <span className="album-page__extra--right-arrow">
          <FontAwesomeIcon icon={faAngleRight} onClick={moveDisplayForward} />
        </span>
      </div>
    </div>
  )
 
}

export default RelatedAlbums;