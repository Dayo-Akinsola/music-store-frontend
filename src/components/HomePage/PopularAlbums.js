import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PopularAlbums = ({ runnersUp }) => {
  const [ counter, setCounter ] = useState(0);
  const [ carouselTransform, setCarouselTransform ] = useState({});
  /* 
    The number of slides it takes to get from the start to the end of the carousel.
    Can be set to any positive int since it will be changed on the first useEffect call.
  */
  const [ slideCount, setSlideCount ] = useState(6);
  const carousel = useRef(null);

  const incrementCounter = () => setCounter((counter + 1) % slideCount);
  const decrementCounter = () =>  setCounter((((counter - 1) % slideCount) + slideCount) % slideCount);

  useEffect(() => {
    const slideCarousel = () => {
      if (carousel.current.childNodes[counter] !== undefined) {
        const imageWidth = carousel.current.childNodes[counter].clientWidth;
        /* Accounts for the the different carousel lengths at different screen sizes */
        const breakpoint1300px = window.innerWidth >= 1300 && counter === runnersUp.length - 3;
        const breakpoint1000px = window.innerWidth >= 1000 && counter === runnersUp.length - 2;
        const breakpoint800px = window.innerWidth >= 800 && counter === runnersUp.length - 1;
        if (window.innerWidth >= 1300) {
          setSlideCount(runnersUp.length - 3);
        } else if (window.innerWidth >= 1000) {
          setSlideCount(runnersUp.length - 2) 
        } else if (window.innerWidth >= 800) {
          setSlideCount(runnersUp.length - 1)
        } else {
          setSlideCount(runnersUp.length);
        }
        if (breakpoint1300px || breakpoint1000px || breakpoint800px) {
          setCarouselTransform({
            transform: `translateX( ${-imageWidth * (0)}px)`
          });
          setCounter(0);
        } else {
            setCarouselTransform({
              transform:  `translateX( ${-imageWidth * (counter) }px)`,
            });
        }
      }
    }
    slideCarousel();
  }, [counter, runnersUp.length]);

  useEffect(() => {

    const interval = setInterval(() => {
      setCounter(counter => (counter + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  })

  if (runnersUp) {
    return (
      <div className="home__popular-albums">
        <div className="home__popular-albums--heading-wrapper">
          <h4 className="home__popular-albums--heading">Featured Albums</h4>
        </div>
        <div className="home__popular-albums--content">
          <div className="home__popular-albums--carousel-wrapper">
            <div ref={carousel} className="home__popular-albums--carousel" style={carouselTransform}>
              {runnersUp.map((album) => (
                <Link key={album.id} to={`/shop/${encodeURIComponent(album.title).replaceAll('%20', '-').replace('---', '-')}/${album.type}/${album.id}`}>
                  <div className="home__popular-albums--album" >
                    <div className="home__popular-albums--img-wrapper">
                      <img src={album.image} alt={album.title} className="home__popular-albums--img" />
                    </div>
                    <div className="home__popular-albums--info">
                      <h5 className="home__popular-albums--title">{album.title.split('-')[1]}</h5>
                      <span className="home__popular-albums--artist">{album.artist}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/shop/popular" className="home__popular-albums--link">
            <div className="home__popular-albums--btn-wrapper">
              <button className="home__popular-albums--btn">Popular Albums</button>
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
      </div>
    )
  }

  return null;
}

export default PopularAlbums;