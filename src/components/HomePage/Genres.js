import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Genres = ({ albums }) => {

  const [topAlbums, setTopAlbums] = useState({
    pop: [],
    rock: [],
    hiphop: [],
    electronic: [],
    jazz: [],
  })

  const getMostPopularAlbums = (genre) => {
    if (genre !== undefined && genre !== []) {
      console.log(genre);
      const albumsPopularity = genre.map((album) => {
        return {
          title: album.title,
          image: album.cover_image,
          albumPopularity: album.community.want + album.community.have,
          id: album.id,
        }
      });
      const sortedByPopularity = albumsPopularity.sort((a, b) => b.albumPopularity - a.albumPopularity);
      return sortedByPopularity.slice(0, 4);
    }
  }

  useEffect(() => {
    const { pop, rock, hiphop, electronic, jazz } = albums;
    setTopAlbums({
      pop: getMostPopularAlbums(pop),
      rock: getMostPopularAlbums(rock),
      hiphop: getMostPopularAlbums(hiphop),
      electronic: getMostPopularAlbums(electronic),
      jazz: getMostPopularAlbums(jazz),
    });     
  
  }, [albums]);

  if (topAlbums.pop.length !== 0) {
    const genreContainer = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '4em auto',
      width: '28em',
      position: 'relative',
      marginBottom: '2em',
    }

    const genresContainerStyle = {
    }

    const imagesContainerStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      margin: 'auto',
      borderWidth: '2px 2px 2px 34px',
      borderStyle: 'solid',
      borderColor: '#d8e2dc',
      padding: '0.3em',
      backgroundColor: '#d8e2dc',
    }
    const imageStyle = {
      width: '8em',
      height: '8em',
    }

    const labelStyle = {
      fontWeight: 600,
      fontSize: '1.2em',
      fontFamily: 'Founders Grotesk, Arial Black, sans-serif',
      position: 'absolute',
      top: '2.3em',
      left: '0.8em',
      background: 'none',
      transformOrigin: '0 0',
      transform: 'rotate(270deg)',
      marginLeft: '3.5em',
      marginTop: '5em',
      color: '#1D3447',
    }

    return(
      <div className="home__genres" style={genresContainerStyle}>
        <div style={genreContainer} className="home__genres--pop" >
          <span className="home__genres--pop-label" style={labelStyle}>Pop</span>
          <div className="home__genres--pop-imgs" style={imagesContainerStyle}>
            {topAlbums.pop.map((album) => (
              <img src={album.image} alt={album.title} key={album.id} className="home__genres--pop-img" style={imageStyle} />
            ))}
          </div>
          <Link className="home__genres--pop-link" to="/shop/pop">
              <button className="home__genres--pop-btn">View Pop </button>
          </Link>
        </div>
      </div>
    )     
  }

  return null;

  
}

export default Genres;