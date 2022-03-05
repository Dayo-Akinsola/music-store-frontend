import { useState ,useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Album from '../ShopPage/Album';

const RelatedAlbums = ({  albumDetails }) => {

  const [slidePageCount, setSlidePageCount] = useState(7);
  const [slidePage, setSlidePage] = useState(0);
  const [slideTransform, setSlideTransform] = useState({});
  const slide = useRef(null);


  const incrementCounter = () => setSlidePage((slidePage + 1) % slidePageCount);
  const decrementCounter = () =>  setSlidePage((((slidePage - 1) % slidePageCount) + slidePageCount) % slidePageCount);


  useEffect(() => {
    const setSlidePages = () => {
      if (window.innerWidth < 900) {
        setSlidePageCount(10);
      } else if (window.innerWidth < 1200) {
        setSlidePageCount(7);
      } else if (window.innerWidth < 1400) {
        setSlidePageCount(5)
      } else {
        setSlidePageCount(4);
      }
    }
    const moveDisplay = () => {
      const slideWidth = slide.current.clientWidth;
      const imageWidth = slide.current.childNodes[0].childNodes[0].clientWidth;
      if (slidePage === slidePageCount - 1 && window.innerWidth >= 900 && window.innerWidth < 1200) {
        /* Stops there being empty space at the end of the slide when there are three albums showing at a time */
        setSlideTransform({
          transform: `translateX( ${-slideWidth * (slidePage - 1) - (imageWidth * 2)}px)`,
        })
      } else {
        setSlideTransform({
        transform:  `translateX( ${-slideWidth * (slidePage)}px)`,
        });
      }
     
    }
    setSlidePages();
    moveDisplay();
  }, [slidePageCount, slidePage]);

  return (
    <div className="album-page__extra--related-wrapper">
      <h3 className="album-page__extra--related-heading">Albums You Might Like</h3>
      <div className="album-page__extra--related-albums" ref={slide}>
        <div className="album-page__extra--related-albums-inner" style={slideTransform}>
          {albumDetails.relatedAlbums.map(album => <Album album={album} key={album.id}/>  )}
        </div>
      </div>
      <div className="album-page__extra--nav-arrows">
        <span className="album-page__extra--left-arrow">
          <FontAwesomeIcon icon={faAngleLeft} onClick={decrementCounter}/>
        </span>
        <div className="album-page__related--page-count">
          <span className="album-page__related--current-count">{slidePage + 1}</span>
          <span className="album-page__related--total-count">{slidePageCount}</span>
        </div>
        <span className="album-page__extra--right-arrow">
          <FontAwesomeIcon icon={faAngleRight} onClick={incrementCounter}/>
        </span>
      </div>
    </div>
  )
 
}

export default RelatedAlbums;