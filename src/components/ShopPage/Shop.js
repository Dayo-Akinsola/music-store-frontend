/* eslint-disable react-hooks/exhaustive-deps */
import Albums from "./Albums";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import Options from "./Options";
import ShopGenre from "./ShopGenre";

const Shop = ({ albums, genre, genres, getPopularAlbums}) => {

  const { popularAlbums } = getPopularAlbums();

  const [pages, setPages] = useState([]);
  const [ searchParams ] = useSearchParams({});

  const paginateAlbums = (albumGroup) => {
    const pageSize = 20;
    const albumsSplitByPages = [];
    for (let i = 0; i < albumGroup.length; i+= pageSize) {
      albumsSplitByPages.push(albumGroup.slice(i, i + pageSize));
    }
    return albumsSplitByPages;
  }
  
  const albumGroup = (genre === 'Popular') ? popularAlbums : albums;
  
  useEffect(() => {
    const paginatedAlbums = paginateAlbums(albumGroup);
    setPages(paginatedAlbums);
  }, [albums, genre]);

  const SortByPrice = (() => {
    const albumsCopy = [...albumGroup];

    const highToLow = () => {
      const ascOrderAlbums = albumsCopy.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      return paginateAlbums(ascOrderAlbums);
    }
    
    const lowToHigh = () => {
      const descOrderAlbums = albumsCopy.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      return paginateAlbums(descOrderAlbums)
    }

    const defaultOrder = () => {
      return paginateAlbums(albumsCopy);
    }

    return {
      highToLow,
      lowToHigh,
      defaultOrder,
    }
  })();


  if (albums || popularAlbums) {
    return (
      <>
        <div className="shop">
          <div className="shop__current-genre-wrapper">
            <h2 className="shop__current-genre">{genre}</h2>
          </div>
          <div className="shop__filter-sort">
            <ul className="shop__genres">
              {
                genres.map((genre, index) => (
                  <ShopGenre key={index} genre={genre} />
                ))
              }
            </ul>
            <Options SortByPrice={SortByPrice} setPages={setPages} genre={genre} />
          </div>
          <Albums pages={pages} searchParams={searchParams} />
          <Pagination pages={pages} searchParams={searchParams} />
        </div>
      </>
    )
  }

  return null;
}

export default Shop;