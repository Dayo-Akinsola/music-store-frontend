import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PopularAlbums = ({ runnersUp }) => {

  const [ counter, setCounter ] = useState(0);
  const [ carouselTransform, setCarouselTransform ] = useState({});
  const carousel = useRef(null);

  const incrementCounter = () => setCounter((counter + 1) % runnersUp.length);
  const decrementCounter = () =>  setCounter((((counter - 1) % runnersUp.length) + runnersUp.length) % runnersUp.length);

  useEffect(() => {
    const slideCarousel = () => {
      if (carousel.current.childNodes[counter] !== undefined) {
        const imageWidth = carousel.current.childNodes[counter].clientWidth;
        setCarouselTransform({
          transform:  `translateX( ${-imageWidth * (counter) }px)`,
        });
      }
    }
    slideCarousel();
  }, [counter]);

  useEffect(() => {

    const interval = setInterval(() => {
      setCounter(counter => (counter + 1) % runnersUp.length);
    }, 5000);

    return () => clearInterval(interval);
  })

  if (runnersUp) {
    return (
      <div className="home__popular-albums">
        <div className="home__popular-albums--carousel-wrapper">
          <div ref={carousel} className="home__popular-albums--carousel" style={carouselTransform}>
            {runnersUp.map((album) => (
              <Link key={album.id} to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/${album.type}/${album.id}`}>
                <div className="home__popular-albums--album" >
                  <div className="home__popular-albums--img-wrapper">
                    <img src={album.image} alt={album.title} className="home__popular-albums--img" />
                  </div>
                  <div className="home__popular-albums--info">
                    <h5 className="home__popular-albums--title">{album.title}</h5>
                    <span className="home__popular-albums--artist">{album.artist}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link to="/shop/popular">
          <div className="home__popular-albums--btn-wrapper">
            <button className="home__popular-albums--btn">Top Albums</button>
          </div>
        </Link>
        <div className="home__popular-albums--nav-arrows">
          <span className="home__popular-albums--left-arrow" onClick={decrementCounter} >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          <span className="home__popular-albums--right-arrow" onClick={incrementCounter}>
            <FontAwesomeIcon icon={faAngleRight}  />
          </span>
        </div>
      </div>
    )
  }

  return null;
}

export default PopularAlbums;