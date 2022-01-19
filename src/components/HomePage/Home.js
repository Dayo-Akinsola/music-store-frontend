import { Link } from 'react-router-dom';
import Header from '../Shared/Header';

const Home = ({ totalQuantity, displayCart}) => {
  return (
    <>
      <Header totalQuantity={totalQuantity} displayCart={displayCart} albumDetails={null} />
      <div className="home">
        <div className="home__text-container">
          <h1 className="home__text--heading">Album Store</h1>
          <h2 className="home__text--main">The latest albums in one place</h2>
          <span className="home__text--sub">Browse and buy from a collection of albums from different genres</span>
          <Link to='/shop/all'>
            <button className="home__text--shop-btn">Shop Now</button>
          </Link>
        </div>
      </div>  
    </>
  );
}

export default Home;