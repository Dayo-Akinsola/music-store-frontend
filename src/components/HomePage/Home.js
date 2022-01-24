import { Link } from 'react-router-dom';
import AlbumOfTheWeek from './AlbumOfTheWeek';
import Genres from './Genres';
import PopularAlbums from './PopularAlbums';



const Home = ({ albums }) => {

  const getMostPopularAlbum = () => {
    const albumsPopularity = albums.all.map((album) => {
      const [artist, title] = album.title.split('-');
      return {
        title,
        artist,
        fullTitle: album.title,
        image: album.cover_image,
        albumPopularity: album.community.want + album.community.have,
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore ad placeat nihil, ducimus omnis excepturi corrupti velit provident nam architecto magnam deserunt officiis neque libero, dolorem facere sapiente repudiandae qui.',
        type: 'release',
        id: album.id,
      }
    });
    const albumsSorted = albumsPopularity.sort((a, b) => b.albumPopularity - a.albumPopularity);
    return {
      bestAlbum: albumsSorted[0],
      runnersUp: albumsSorted.slice(1, 11)
    }
  }

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
      <Genres albums={albums} />
      <AlbumOfTheWeek  getMostPopularAlbum={getMostPopularAlbum}/>
      <PopularAlbums getMostPopularAlbums={getMostPopularAlbum}/>
    </div>  
  );
}

export default Home;