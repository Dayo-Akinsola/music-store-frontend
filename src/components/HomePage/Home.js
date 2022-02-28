import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlbumOfTheWeek from './AlbumOfTheWeek';
import Genres from './Genres';
import PopularAlbums from './PopularAlbums';

const Home = ({ getPopularAlbums }) => {
  const [offsetY, setOffsetY] = useState(0);
  const {bestAlbum, runnersUp} = getPopularAlbums();
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <section className="home__bg-img-header">
        <div className="home__bg-img" style={{transform: `translateY(${0.5 * offsetY}px)`}}>
          <div className="home__text-container" style={{opacity: `${parseFloat(1 - parseFloat((offsetY * 0.155)) / 100)}`}}>
            <h2 className="home__text--main">The latest albums in one place</h2>
            <span className="home__text--sub">Browse and buy from a collection of albums from different genres</span>
            <Link className="home__text--shop-link" to='/shop/all'>
              <button className="home__text--shop-btn">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>
      <div className="home__content">
        <Genres />
        <AlbumOfTheWeek  bestAlbum={bestAlbum}/>
        <PopularAlbums runnersUp={runnersUp}/>    
      </div>
    </div>        
  );
}

export default Home;