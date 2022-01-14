import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/ShopPage/Shop';
import AlbumDetails from './components/AlbumPage/AlbumDetails';
import CartSidebar from './components/CartSidebar/CartSidebar';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  const [albums, setAlbums] = useState(
    {
      all: [],
      pop: [],
      rock: [],
      electronic: [],
      hiphop: [],
      jazz: [],
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  
  const getAlbumSet = async (style) => {
    const response = await fetch(`http://localhost:3001/${style}`, { mode: 'cors' });
    const data = await response.json()
    const albums = data.results; 
    return albums;
  }
  
  const getAllAlbums = async () => {
    const popStyleAlbums = await getAlbumSet('pop');
    const hiphopStyleAlbums = await getAlbumSet('hiphop');
    const jazzStyleAlbums = await getAlbumSet('jazz');

    return [].concat(popStyleAlbums, hiphopStyleAlbums, jazzStyleAlbums);
  }

  const setAlbumPrices = async () => {
    const allAlbums = await getAllAlbums();
    return allAlbums.map((album) => {
      const price = ((album.community.want + album.community.have) * 0.25).toFixed(2);
      album['price'] = price;
      return album;
    });
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value && value <= 20) {
      setQuantity(value);
    }
  }

  const incrementQuantity = () => {
    if (quantity <= 19) {
      setQuantity(quantity + 1);
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const hideCart = () => {
    setShowCart(false);
  }

  const displayCart = () => {
    setShowCart(true);
  }

  const addAlbumToCart = (album) => {
    const albumInCart = cart.filter(item => item.id === album.id);
    if (albumInCart.length === 0) {
      setCart(
        cart.concat({
          title: album.albumTitle,
          price: parseFloat(album.price),
          thumb: album.thumb,
          id: album.id,
          quantity,
        })
      );
    } else {
      setCart(cart.map(item => {
        if (item.id === album.id) {
          item.quantity += quantity;
        }
        return item;
      }));
      setQuantity(1);
    }
    displayCart();
  }



  useEffect(() => {
    setAlbumPrices()
      .then((allAlbums) => {
        setAlbums(
          {
            all: allAlbums.map(album => album),
            pop: allAlbums.filter(album => album.genre.includes('Pop')),
            rock: allAlbums.filter(album => album.genre.includes('Rock')),
            electronic: allAlbums.filter(album => album.genre.includes('Electronic')),
            hiphop: allAlbums.filter(album => album.genre.includes('Hip Hop')),
            jazz: allAlbums.filter(album => album.genre.includes('Jazz')),
          }
        );
      });  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const quantityReducer = (previousValue, currentValue) => previousValue + currentValue;

    const getTotalQuantity = () => {
      const quantities = cart.map(item => item.quantity);
      const total = cart.length > 0 ? quantities.reduce(quantityReducer) : 0;
      return total;
    }

    const total = getTotalQuantity();
    setTotalQuantity(total);
  }, [cart]);

  return (
    <>
      <Router>
        <Header totalQuantity={totalQuantity} displayCart={displayCart} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop'>
            <Route path='all' element={<Shop albums={albums.all} category='All' />}></Route>
            <Route path='pop' element={<Shop albums={albums.pop} category='Pop' />}></Route>
            <Route path='rock' element={<Shop albums={albums.rock} category='Rock' />}></Route>
            <Route path='electronic' element={<Shop albums={albums.electronic} category='Electronic' />}></Route>
            <Route path='hip-hop' element={<Shop albums={albums.hiphop} category='Hip Hop' />}></Route>
            <Route path='jazz' element={<Shop albums={albums.jazz} category='Jazz' />}></Route>
            <Route 
              path=':uri/:type/:id' 
              element={<AlbumDetails 
              setAlbumPrices={setAlbumPrices} 
              quantity={quantity}
              setQuantity={setQuantity}
              handleQuantityChange={handleQuantityChange}
              addAlbumToCart={addAlbumToCart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              cart={cart}
            />}></Route>
          </Route>
        </Routes>
        {showCart ? <CartSidebar cart={cart} setCart={setCart} hideCart={hideCart} totalQuantity={totalQuantity} /> : <></>}
      </Router>
    </>
  );
}

export default App;
