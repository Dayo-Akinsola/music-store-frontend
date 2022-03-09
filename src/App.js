import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Home from './components/HomePage/Home';
import Shop from './components/ShopPage/Shop';
import AlbumDetails from './components/AlbumPage/AlbumDetails';
import CartSidebar from './components/CartSidebar/CartSidebar';
import OrderSummary from './components/Order/OrderSummary';
import ScrollToTop from './components/Shared/ScrollToTop';
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './components/Order/Checkout/CheckoutPage';
import Payment from './components/Order/Checkout/Payment/Payment';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { getRequest, dataChangeRequest } from './sevices/service';
import Account from './components/AccountPage/Account';
import AccountOrders from './components/AccountPage/AccountViews/Orders/AccountOrders';
import AccountWishlist from './components/AccountPage/AccountViews/Wishlist/AccountWishlist';
import AccountWishlistAlbumModal from './components/AccountPage/AccountViews/Wishlist/AccountWishlistAlbumModal';
import AccountDetails from './components/AccountPage/AccountViews/Details/AccountDetails';
import AccountFriends from './components/AccountPage/AccountViews/Friends/AccountFriends';
import AccountFriendList from './components/AccountPage/AccountViews/Friends/Friendlist/AccountFriendList';
import AccountFriendRequests from './components/AccountPage/AccountViews/Friends/Requests/AccountFriendRequests';
import AccountReviews from './components/AccountPage/AccountViews/Reviews/AccountReviews';
import Notification from './components/Shared/Notification';
import ProfilePage from './components/Profile/ProfilePage';
import ProfileReviews from './components/Profile/ProfileViews/Reviews/ProfileReviews';
import ProfileWishlist from './components/Profile/ProfileViews/Wishlist/ProfileWishlist';
import ProfileWishlistModal from './components/Profile/ProfileViews/Wishlist/ProfileWishlistModal';
import ProfileFriends from './components/Profile/ProfileViews/ProfileFriends';
import AuthenticatedRoutes from './components/Shared/AuthenticatedRoutes';
import AccountOverview from './components/AccountPage/AccountViews/AccountOverview';
  
export const UserContext = createContext();
export const setUserContext = createContext();

const App = () => {

  const [user, setUser] = useState({ token: null, username: null, name: null, id: null});
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
  const [hidden, setHidden] = useState(true);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '', 
    lastName: '', 
    address: '', 
    city: '', 
    postCode: '', 
    phone: '', 
    email: '',
  });
  const [ errorMessages, setErrorMessages ] = useState({
    firstName: '',
    lastName: '', 
    address: '', 
    city: '', 
    postCode: '', 
    phone: '', 
    email: '',
  });
  const [ notification, setNotification] = useState('');
  const [ userInfo, setUserInfo] = useState({
    friends: [],
    name: '',
    reviews: [],
    votedReviews: [],
    wishlist: [],
  });
  const [authentication, setAuthentication] = useState({
    isLoggedIn: null,
    isLoading: true,
  });

  const retriveUserInfoFromLocalStorage = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userInfoParsed = JSON.parse(loggedInUser);
      return userInfoParsed;
    } else {
      /* If no user is present retrieve guest data from local storage if there is any */
      const guestCart = window.localStorage.getItem('guest-cart');
      if (guestCart) {
        setCart(JSON.parse(guestCart));
      } else {
        window.localStorage.setItem('guest-cart', JSON.stringify([]));
      }
    }
    return null;
  }

  useEffect(() => {
    const checkToken = async () => {
      const userInfo = retriveUserInfoFromLocalStorage();
      if (!userInfo) {
        setAuthentication({ isLoggedIn: false, isLoading: false});
        return;
      }
      const response = await getRequest('http://localhost:3001/users/details', userInfo.token);
      if (response.ok) {
        setAuthentication({ isLoggedIn: true, isLoading: false });
      } else {
        setAuthentication({ isLoggedIn: false, isLoading: false });
      }
    }
    checkToken();
  }, [user.token]);

  useEffect(() => {
    const setAlbumCollections = async () => {
      const allAlbums = await getAllAlbums();
      setAlbums({
        all: allAlbums.map(album => album),
        pop: allAlbums.filter(album => album.genre.includes('Pop')),
        rock: allAlbums.filter(album => album.genre.includes('Rock')),
        electronic: allAlbums.filter(album => album.genre.includes('Electronic')),
        hiphop: allAlbums.filter(album => album.genre.includes('Hip Hop')),
        jazz: allAlbums.filter(album => album.genre.includes('Jazz')),
      });
    }
    setAlbumCollections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setUserFromLocalStorage = () => {
      const userInfo = retriveUserInfoFromLocalStorage();
      if (userInfo) {
        setUser(userInfo);
        return userInfo;
      }
      return null;
    }

    const setUserCartAlbums = async (userInfo) => {
      if (userInfo) {
        const response = await getRequest('http://localhost:3001/users/cart', userInfo.token);
        const cartItems = await response.json();
        setCart(cartItems);
      }
    }

    const userInfo = setUserFromLocalStorage();
    setUserCartAlbums(userInfo);
    
  }, [user.token]);


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

  const updateUserCart = async (albumData, token) => {
    const response = await dataChangeRequest('http://localhost:3001/users/cart', albumData, token, 'PUT');
    const cartData = await response.json();
    setCart(cartData);  
  }

  const updateGuestCart = async (albumData) => {
    const guestCart = window.localStorage.getItem('guest-cart');
    const guestCartParsed = JSON.parse(guestCart);
    let matchingAlbumIndex;
    const dupeAlbumCheck = guestCartParsed.filter((album , index) => {
      if (album.id === albumData.id) {
        matchingAlbumIndex = index;
        return true;
      }
      return false;
    });

    if (albumData.replace) {
      guestCartParsed[matchingAlbumIndex].quantity = albumData.quantity;
    }
    
    else if (dupeAlbumCheck.length === 0) {
      guestCartParsed.push(albumData);
    } else {
      guestCartParsed[matchingAlbumIndex].quantity += albumData.quantity;
    }
    setCart(guestCartParsed);
    window.localStorage.setItem('guest-cart', JSON.stringify(guestCartParsed));
  }

  const addAlbumToCart = async (album) => {
    const albumData = {
      title: albums.albumTitle ? album.albumTitle: album.title,
      price: parseFloat(album.price),
      thumb: album.thumb,
      id: album.id ? album.id : album.albumId,
      quantity, 
      replace: false,
    };
    if (user.token) {
      updateUserCart(albumData, user.token);
    } else {
      updateGuestCart(albumData);
    }
    setQuantity(1);
    displayCart();
  }

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
      bestAlbums: albumsSorted.slice(0, 3).map((album, index) => ( { ...album, place: index + 1 } )),
      runnersUp: albumsSorted.slice(3, 13),
      popularAlbums: albumsSorted.slice(0, 20),
    }
  };

  const incrementAlbumQuantity = async (cartAlbum) => {
    const albumData = {
      title: cartAlbum.albumTitle,
      price: parseFloat(cartAlbum.price),
      thumb: cartAlbum.thumb,
      id: cartAlbum.id,
      quantity: 1,
      replace: false,
    };
    if (cartAlbum.quantity <= 20) {
      if (user.token) {
        updateUserCart(albumData, user.token);
      } else {
        updateGuestCart(albumData);
      }
    }
  }

  const decrementAlbumQuantity = (cartAlbum) => {
    const albumData = {
      title: cartAlbum.albumTitle,
      price: parseFloat(cartAlbum.price),
      thumb: cartAlbum.thumb,
      id: cartAlbum.id,
      quantity: -1,
      replace: false,
    };
    if (cartAlbum.quantity > 1) {
      if (user.token) {
        updateUserCart(albumData, user.token);
      } else {
        updateGuestCart(albumData);
      }
    }
  }

  const handleAlbumQuantityChange = (event, cartAlbum) => {
    const value = parseInt(event.target.value);
    const albumData = {
      title: cartAlbum.albumTitle,
      price: parseFloat(cartAlbum.price),
      thumb: cartAlbum.thumb,
      id: cartAlbum.id,
      quantity: value,
      replace: true,
    };
    if (value && value <= 20) {
      if (user.token) {
        updateUserCart(albumData, user.token);
      } else {
        updateGuestCart(albumData);
      }
    }
  }

  const albumQuantityControl = {
    handleAlbumQuantityChange,
    incrementAlbumQuantity, 
    decrementAlbumQuantity
  }

  const removeCartAlbum = async (id) => {
    if (user.token) {
      const response = await dataChangeRequest(`http://localhost:3001/users/cart`, { id }, user.token, 'DELETE');
      const newCart = await response.json();
      setCart(newCart);
    } else {
      const guestCart = window.localStorage.getItem('guest-cart');
      const guestCartParsed = JSON.parse(guestCart);
      const filteredGuestCart = guestCartParsed.filter(album => album.id !== id);
      setCart(filteredGuestCart);
      window.localStorage.setItem('guest-cart', JSON.stringify(filteredGuestCart));
    }
  }

  const inputInvalidStyle = {
    backgroundColor: '#ffdddd',
    border: '1px solid crimson',
  }

  const inputValidStyle = {
    backgroundColor: '#fff',
    border: '1px solid black',
  }

  const formErrorCheck = () => {
    const inputNames = Object.keys(deliveryDetails);
    let isFormValid = false;
    const formattedNames = {
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Address',
      city: 'City / Town',
      postCode: 'Post Code',
      email: 'Email Address',
      phone: 'Phone Number',
    }

    let errorCaught = false;
    inputNames.forEach(name => {
      if (name === 'postCode') {
        const postCodeCheck = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(deliveryDetails.postCode);
        const invalidPostCodeMessage = 'You must enter a valid UK Post Code';
        if (!postCodeCheck) {
          setErrorMessages(messages => ({...messages, [name]: invalidPostCodeMessage}));
          errorCaught = true;        
        } 
      }

      if (name === 'phone') {
        const value = deliveryDetails[name];
        const invalidNumberMessage = 'You must enter a valid UK Phone Number.';
        if (value.length !== 10 && value.length !== 11) {
          setErrorMessages(messages => ({...messages, [name]: invalidNumberMessage}));
          errorCaught = true;
        }
      }

      if (name === 'email') {
        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryDetails.email);
        const invalidEmailMessage = 'You must enter a valid Email Address';
        if (!emailCheck) {
          setErrorMessages(messages => ({...messages, [name]: invalidEmailMessage}));
          errorCaught = true;
        }
      }

      if (deliveryDetails[name].length === 0) {
        const errorMessage = `Please enter your ${formattedNames[name]}.`;
        setErrorMessages((messages) => ({...messages, [name]: errorMessage}));
        errorCaught = true;
      }
      
      if (errorCaught) {
        isFormValid = false;
      }

      if (!errorCaught) {
        setErrorMessages(messages => ({...messages, [name]: ''}));
        isFormValid = true;
      }
    });
    
    return isFormValid;
  }
  
  return (
    <div className="container" onClick={hideMobileNav}>
      <UserContext.Provider value={user} >
        <setUserContext.Provider value={setUser} > 
          <Router>
            <ScrollToTop />
            <Header totalQuantity={totalQuantity} displayCart={displayCart} hidden={hidden} toggleNavDisplay={toggleNavDisplay} />
            <Notification notification={notification} setNotification={setNotification}/>
            <Routes>
              <Route path='/' element={<Home getPopularAlbums={getPopularAlbums} totalQuantity={totalQuantity} displayCart={displayCart} albums={albums} />}></Route>
              <Route path='/shop'>
                <Route path='all' element={<Shop albums={albums.all} genre='All' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='pop' element={<Shop albums={albums.pop} genre='Pop' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='rock' element={<Shop albums={albums.rock} genre='Rock' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='electronic' element={<Shop albums={albums.electronic} genre='Electronic' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='hip-hop' element={<Shop albums={albums.hiphop} genre='Hip Hop' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='jazz' element={<Shop albums={albums.jazz} genre='Jazz' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
                <Route path='popular' element={<Shop albums={albums.all} genre='Popular' genres={Object.keys(albums)} getPopularAlbums={getPopularAlbums} />}></Route>
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
                  setNotification={setNotification}
                />}></Route>
              </Route>
              <Route 
                path='/order' 
                element={<OrderSummary 
                cart={cart} 
                albumQuantityControl={albumQuantityControl} 
                removeCartAlbum={removeCartAlbum} 
                totalQuantity={totalQuantity} 
                />}
              >
              </Route>
              <Route path='/checkout' 
                element={
                <CheckoutPage 
                cart={cart} 
                deliveryDetails={deliveryDetails} 
                formErrorCheck={formErrorCheck} 
                errorMessages={errorMessages}
                setDeliveryDetails={setDeliveryDetails}
              />}></Route>
              <Route
                path='/payment' 
                element={
                  <Payment 
                    cart={cart}
                    setCart={setCart}
                    inputInvalidStyle={inputInvalidStyle} 
                    inputValidStyle={inputValidStyle} 
                    deliveryDetails={deliveryDetails}
                  />}>
                </Route>
              <Route path='/login' element={<Login inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} setUser={setUser} />}></Route>
              <Route path='/register' element={<Register inputInvalidStyle={inputInvalidStyle} inputValidStyle={inputValidStyle} />}></Route>
              <Route element={<AuthenticatedRoutes authentication={authentication} />}>
                <Route path='account' element={<Account />}>
                  <Route path='' element={<AccountOverview />}></Route>
                  <Route path='orders' element={<AccountOrders user={user} />}></Route>
                  <Route path='wishlist' element={<AccountWishlist user={user} />}>
                    <Route path=':albumId' element={<AccountWishlistAlbumModal addAlbumToCart={addAlbumToCart} />}></Route>
                  </Route>
                  <Route path='details' 
                    element={
                    <AccountDetails 
                      deliveryDetails={deliveryDetails}
                      formErrorCheck={formErrorCheck}
                      errorMessages={errorMessages}
                      setDeliveryDetails={setDeliveryDetails}
                    />}>
                  </Route>
                  <Route path='friends' element={<AccountFriends />}>
                    <Route path='friendlist' element={<AccountFriendList />}></Route>
                    <Route path='requests' element={<AccountFriendRequests />}></Route>
                  </Route>
                  <Route path='reviews' element={<AccountReviews user={user}/>}></Route>
                </Route>
              </Route>
              <Route path='/profile/:userId' element={<ProfilePage userInfo={userInfo} setUserInfo={setUserInfo}/>}>
                <Route path='reviews' element={<ProfileReviews userInfo={userInfo} />}></Route>
                <Route path='wishlist' element={<ProfileWishlist userInfo={userInfo} />}>
                  <Route path=':albumId' element={<ProfileWishlistModal addAlbumToCart={addAlbumToCart} />}></Route>
                </Route>
                <Route path='friends' element={<ProfileFriends userInfo={userInfo} />}></Route>
              </Route>
            </Routes>
            {
            showCart 
              ? 
              <CartSidebar
                cart={cart} 
                hideCart={hideCart} 
                totalQuantity={totalQuantity} 
                albumQuantityControl={albumQuantityControl}
                removeCartAlbum={removeCartAlbum}
                user={user}
              /> 
              : 
              <></>
            }
          </Router>
        </setUserContext.Provider>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;