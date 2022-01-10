import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/ShopPage/Shop';
import AlbumDetails from './components/AlbumDetailsPage/AlbumDetails';
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


  useEffect(() => {
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

    const setInitialState = async () => {
      const allAlbums = await getAllAlbums();
      allAlbums.map((album) => {
        const price = ((album.community.want + album.community.have) * 0.25).toFixed(2);
        album['price'] = price;
        return album;
      })
      console.log(allAlbums);
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
    }

    setInitialState();
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop'>
            <Route path='all' element={<Shop albums={albums.all} category='All' />}></Route>
            <Route path='pop' element={<Shop albums={albums.pop} category='Pop' />}></Route>
            <Route path='rock' element={<Shop albums={albums.rock} category='Rock' />}></Route>
            <Route path='electronic' element={<Shop albums={albums.electronic} category='Electronic' />}></Route>
            <Route path='hip-hop' element={<Shop albums={albums.hiphop} category='Hip Hop' />}></Route>
            <Route path='jazz' element={<Shop albums={albums.jazz} category='Jazz' />}></Route>
            <Route path=':uri/:id' element={<AlbumDetails albums={albums.all}/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
