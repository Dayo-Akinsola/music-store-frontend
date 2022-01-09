import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
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
          <Route path='/Shop' element={<Shop />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
