import { useState ,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Album from '../ShopPage/Album';


const RelatedAlbums = ({ relatedAlbums, albumDetails, urlParams }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shownAlbums, setShownAlbums] = useState([]);

  useEffect(() => {
    const setInitialShownAlbums = () => {
      const nextShownAlbums = [];
      relatedAlbums.map((album, index) => {
        if (index === currentIndex || index === currentIndex + 1) {
          nextShownAlbums.push(album);
        }
        return album;
      });
      setShownAlbums(nextShownAlbums);
    }

    setInitialShownAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, urlParams]);

  const relatedLength = (relatedAlbums.relatedLength % 2 === 0) ? relatedAlbums.length : relatedAlbums.length - 1;
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
        {shownAlbums.map(album => <Album album={album} key={album.id}/>  )}
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