/* eslint-disable react-hooks/exhaustive-deps */
import Albums from "./Albums";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import Options from "./Options";

const Shop = ({ albums, genre, getPopularAlbums }) => {

  const { popularAlbums } = getPopularAlbums();

  const [pages, setPages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const paginateAlbums = (albumGroup) => {
    // const albumGroup = (genre === 'Popular') ? popularAlbums : albumsToPaginate;
    const pageSize = 20;
    const albumsSplitByPages = [];
    for (let i = 0; i < albumGroup.length; i+= pageSize) {
      albumsSplitByPages.push(albumGroup.slice(i, i + pageSize));
    }
    setPages(albumsSplitByPages);
  }

  useEffect(() => {
    const albumGroup = (genre === 'Popular') ? popularAlbums : albums;
    paginateAlbums(albumGroup);
  }, [albums, genre]);

  const SortByPrice = (() => {
    const highToLow = () => {
      const sortedAlbums = albums.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      paginateAlbums(sortedAlbums);
    }
    
    const lowToHigh = () => {
      return albums.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    }

    return {
      highToLow,
      lowToHigh,
    }
  })();


  if (albums || popularAlbums) {
    return (
      <>
        <div className="shop">
          <div className="shop__current-genre-wrapper">
            <h2 className="shop__current-genre">{genre}</h2>
          </div>
          <Options SortByPrice={SortByPrice} />
          <Albums pages={pages} searchParams={searchParams} />
          <Pagination pages={pages} searchParams={searchParams} />
        </div>
      </>
    )
  }

  return null;
}

export default Shop;