import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const importGenreImages = (r) => {
  let images = {};
  r.keys().map((imageUrl) => images[imageUrl.replace('./', '')] = r(imageUrl));  
  return images;
}
const genreImages = importGenreImages(require.context('../../assets/genre-images', false, /\.(png|jpe?g|svg)$/));
const Genre = ({ genre, bgColor}) => {

  const [ attribution, setAttribution ] = useState(null);

  useEffect(() => {
    const setMessage = () => {
      if (genre === 'pop') {
        setAttribution(
          <span>Photo by <a href="https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jason Leung</a> on <a href="https://unsplash.com/s/photos/pop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
        );
      } else if (genre === 'rock') {
        setAttribution(
          <span>
            Photo by <a href="https://unsplash.com/@rocinante_11?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mick Haupt</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </span>
        )
      } else if (genre === 'hiphop') {
        setAttribution(
          <span>
            Photo by <a href="https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Erik Mclean</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </span>
        )
      } else if (genre === 'electronic') {
        setAttribution(
          <span>
            Photo by <a href="https://unsplash.com/@blockerphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Phillip Blocker</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </span>
        )
      } else if (genre === 'jazz') {
        setAttribution(
          <span>
            Photo by <a href="https://unsplash.com/@rocinante_11?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mick Haupt</a> on <a href="https://unsplash.com/s/photos/jazz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </span>
        )
      }
    }

    setMessage();
  }, [genre]);
  
  const genreContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1.5em auto',
    marginBottom: '2em',
    border: 'solid 1px #d4d6d9',
  }
  
  const imagesContainerStyle = {
    margin: 'auto',
    borderColor: `${bgColor}`,
    width: '100%',
    height: '50vh',
    minWidth: '16em',
  }
  const imageStyle = {
    width: '100%',
    height: '100%',
    filter: 'brightness(0.8)',
  }

  return (
    <div className={`home__genres--${genre} genre`} style={genreContainer}  >
      <Link to={genre === 'hiphop' ? '/shop/hip-hop' : `/shop/${genre}`}>
      <div className={`home__genres--${genre}-imgs genre-imgs`} style={imagesContainerStyle}>
        <img src={genreImages[`${genre}.jpg`]} alt={genre} className={`home__genres--${genre}-img genre-img`} style={imageStyle} />
      </div>
      <div className={`home__genres--${genre}-btn-container genre-btn-container`} >
        <span className={`home__genres--${genre}-btn genre-btn`}>{genre.toUpperCase()}</span>  
      </div>
      </Link>
      <span className={`home__genres--${genre}-img-credit img-credit`}>{attribution}</span>
    </div>
  )
}

export default Genre;