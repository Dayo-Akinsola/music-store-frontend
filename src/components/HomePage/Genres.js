import { useState, useEffect } from 'react';
import Genre from './Genre';

const Genres = ({ albums }) => {

  const [topAlbums, setTopAlbums] = useState({
    pop: [],
    rock: [],
    hiphop: [],
    electronic: [],
    jazz: [],
  });

  const getMostPopularAlbums = (genre) => {
    if (genre !== undefined && genre !== []) {
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
    
    return(
      <div className="home__genres">  
        <div className="home__genres--title-wrapper home__sub-title-wrapper">
          <span className="home__genres--title home__sub-title">Genres</span>
        </div>
        <div className="home__genres--content">
          <Genre topAlbums={topAlbums} genre='pop' bgColor='#fae1dd' top='2.3em' />
          <Genre topAlbums={topAlbums} genre='rock' bgColor='#cfbaf0' top='3em' />
          <Genre topAlbums={topAlbums} genre='hiphop' bgColor='#bbdefb' top='3.9em' />
          <Genre topAlbums={topAlbums} genre='electronic' bgColor='#fbf8cc' top='4.1em' />
          <Genre topAlbums={topAlbums} genre='jazz' bgColor='#caffbf' top='3em' />
        </div>
      </div>
    )     
  }

  return null;

  
}

export default Genres;