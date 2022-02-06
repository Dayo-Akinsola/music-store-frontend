import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './components/HomePage/Home';
import Shop from './components/ShopPage/Shop';
import AlbumDetails from './components/AlbumPage/AlbumDetails';
import CartSidebar from './components/CartSidebar/CartSidebar';
import OrderSummary from './components/Order/OrderSummary';
import ScrollToTop from './components/Shared/ScrollToTop';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './components/Order/Checkout/CheckoutPage';
import Payment from './components/Order/Checkout/Payment/Payment';
import Login from './components/User/Login';
import Register from './components/User/Register';

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
  const [ hidden, setHidden ] = useState(true);

  
  const getAlbumSet = async (style) => {
    const response = await fetch(`http://localhost:3001/discogs/${style}`, { withCredentials: true, mode: 'cors' });
    const data = await response.json()
    const albums = data.results; 
    return albums;
  }
  
  const requestAlbums = async () => {
    const popStyleAlbums = await getAlbumSet('pop');
    const hiphopStyleAlbums = await getAlbumSet('hiphop');
    const jazzStyleAlbums = await getAlbumSet('jazz');

    return [].concat(popStyleAlbums, hiphopStyleAlbums, jazzStyleAlbums);
  }

  const removeDuplicateAlbums = (requestedAlbums) => {
    const albumsByTitle = {}
    const duplicates = [];
    requestedAlbums.forEach((album) => {
      const albumPopularity = album.community.have + album.community.want;
      if (!albumsByTitle[album.title]) {
        albumsByTitle[album.title] = {'id': album.id, 'popularity': albumPopularity};
      } else {

        if (albumsByTitle[album.title].popularity < albumPopularity) {
          duplicates.push(albumsByTitle[album.title].id);
          albumsByTitle[album.title] = {'id': album.id, 'popularity': albumPopularity};
        } else {
          duplicates.push(album.id);
        }
      }
    });
    const filteredAlbums = requestedAlbums.filter(album => !duplicates.includes(album.id));
    return filteredAlbums;
  }

  const setAlbumPrices = async (albums) => {
    return albums.map((album) => {
      const price = ((album.community.want + album.community.have) * 0.25).toFixed(2);
      album['price'] = price;
      return album;
    });
  }

  const getAllAlbums = async () => {
    const requestedAlbums = await requestAlbums();
    const filteredAlbums = removeDuplicateAlbums(requestedAlbums);
    const allAlbums = setAlbumPrices(filteredAlbums);
    return allAlbums;
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
    getAllAlbums()
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

  const toggleNavDisplay = () => setHidden(!hidden);

  const hideMobileNav = () =>  {
    if (!hidden) {
      setHidden(true);
    }
  }

  const getPopularAlbums = () => {
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
        ...album,
      }
    });
    const albumsSorted = albumsPopularity.sort((a, b) => b.albumPopularity - a.albumPopularity);
    return {
      bestAlbum: albumsSorted[0],
      runnersUp: albumsSorted.slice(1, 11),
      popularAlbums: albumsSorted.slice(0, 20),
    }
  };

  const incrementAlbumQuantity = (cartAlbum) => {
    if (cartAlbum.quantity <= 20) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity += 1;
        }
        return album;
      }));
    }
  }

  const decrementAlbumQuantity = (cartAlbum) => {
    if (cartAlbum.quantity > 1) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity -= 1;
        }
        return album;
      }));
    }
  }

  const handleAlbumQuantityChange = (event, cartAlbum) => {
    const value = parseInt(event.target.value);
    if (value && value <= 20) {
      setCart(cart.map(album => {
        if (album.id === cartAlbum.id) {
          album.quantity = value;
        }
        return album;
      }));
    }
  }

  const albumQuantityControl = {
    handleAlbumQuantityChange,
    incrementAlbumQuantity, 
    decrementAlbumQuantity
  }

  const removeCartAlbum = (cartAlbum) => {
    setCart(cart.filter(album => album.id !== cartAlbum.id));
  }

  const inputInvalidStyle = {
    backgroundColor: '#ffdddd',
    border: '1px solid crimson',
  }

  const inputValidStyle = {
    backgroundColor: '#fff',
    border: '1px solid black',
  }

  return (
    <div className="container" onClick={hideMobileNav}>
      <Router>
        <ScrollToTop />
        <Header totalQuantity={totalQuantity} displayCart={displayCart} hidden={hidden} toggleNavDisplay={toggleNavDisplay} />
        <Routes>
          <Route path='/' element={<Home getPopularAlbums={getPopularAlbums} totalQuantity={totalQuantity} displayCart={displayCart} albums={albums} />}></Route>
          <Route path='/shop'>
            <Route path='all' element={<Shop albums={albums.all} genre='All' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='pop' element={<Shop albums={albums.pop} genre='Pop' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='rock' element={<Shop albums={albums.rock} genre='Rock' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='electronic' element={<Shop albums={albums.electronic} genre='Electronic' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='hip-hop' element={<Shop albums={albums.hiphop} genre='Hip Hop' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='jazz' element={<Shop albums={albums.jazz} genre='Jazz' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route path='popular' element={<Shop albums={albums.all} genre='Popular' getPopularAlbums={getPopularAlbums} />}></Route>
            <Route 
              path=':uri/:type/:id' 
              element={<AlbumDetails 
              totalQuantity={totalQuantity}
              displayCart={displayCart}
              getAllAlbums={getAllAlbums} 
              quantity={quantity}
              setQuantity={setQuantity}
              handleQuantityChange={handleQuantityChange}
              addAlbumToCart={addAlbumToCart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              cart={cart}
            />}></Route>
          </Route>
          <Route 
            path='/order' 
            element={<OrderSummary 
            cart={cart} 
            albumQuantityControl={albumQuantityControl} 
            removeCartAlbum={removeCartAlbum} 
            totalQuantity={totalQuantity} />}
          >
          </Route>
          <Route path='/checkout' element={<CheckoutPage cart={cart}/>}></Route>
          <Route path='/payment' element={<Payment cart={cart} inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} />}></Route>
          <Route path='/login' element={<Login inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} />}></Route>
          <Route path='/register' element={<Register inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} />}></Route>
        </Routes>
        {
        showCart 
          ? 
          <CartSidebar 
            cart={cart} hideCart={hideCart} 
            totalQuantity={totalQuantity} 
            albumQuantityControl={albumQuantityControl}
            removeCartAlbum={removeCartAlbum}
          /> 
          : 
          <></>
        }
      </Router>
      <Footer />
    </div>
  );
}

export default App;
