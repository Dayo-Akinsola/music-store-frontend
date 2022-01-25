import { Link } from 'react-router-dom';
import AlbumOfTheWeek from './AlbumOfTheWeek';
import Genres from './Genres';
import PopularAlbums from './PopularAlbums';



const Home = ({ getPopularAlbums }) => {

  const {bestAlbum, runnersUp} = getPopularAlbums();

  return (
    <div className="home">
      <div className="home__bg-img">
        <div className="home__text-container">
          <h2 className="home__text--main">The latest albums in one place</h2>
          <span className="home__text--sub">Browse and buy from a collection of albums from different genres</span>
          <Link className="home__text--shop-link" to='/shop/all'>
            <button className="home__text--shop-btn">Shop Now</button>
          </Link>
        </div>
      </div>
      <Genres />
      <AlbumOfTheWeek  bestAlbum={bestAlbum}/>
      <PopularAlbums runnersUp={runnersUp}/>
    </div>  
  );
}

export default Home;