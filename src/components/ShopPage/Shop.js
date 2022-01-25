import Albums from "./Albums";
const Shop = ({ albums, genre, getPopularAlbums }) => {

  const { popularAlbums } = getPopularAlbums();


  if (albums || popularAlbums) {
    return (
      <>
        <div className="shop">
          <div className="shop__current-genre-wrapper">
            <h2 className="shop__current-genre">{genre}</h2>
          </div>
          <Albums albums={ genre === 'Popular' ? popularAlbums: albums} />
        </div>
      </>
    )
  }

  return null;
}

export default Shop;