import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home__text-container">
        <h2 className="home__text--main">The latest albums in one place</h2>
        <span className="home__text--sub">Browse and buy from a collection of albums from different genres</span>
        <Link to='/shop/all'>
          <button className="home__text--shop-btn">Shop Now</button>
        </Link>
      </div>
    </div>  
  );
}

export default Home;