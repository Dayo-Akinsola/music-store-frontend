import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import firstLetterUpper from "./helpers/firstLetterUpper";

const importGenreImages = (r) => {
  let images = {};
  r.keys().map((imageUrl) => images[imageUrl.replace('./', '')] = r(imageUrl));  
  return images;
}
const genreImages = importGenreImages(require.context('../../assets/genre-images', false, /\.(png|jpe?g|svg)$/));
const Genre = ({ topAlbums, genre, bgColor, top}) => {

  const [ attribution, setAttribution ] = useState(null);

  console.log(genreImages);
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
            Photo by <a href="https://unsplash.com/@florenciaviadana?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Florencia Viadana</a> on <a href="https://unsplash.com/s/photos/jazz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
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
    // width: '28em',
    // position: 'relative',
    marginBottom: '2em',
  }
  
  const imagesContainerStyle = {
    margin: 'auto',
    //borderWidth: '2px 2px 2px 34px',
    //borderStyle: 'solid',
    borderColor: `${bgColor}`,
    //padding: '0.3em',
    backgroundColor: `${bgColor}`,
  }
  const imageStyle = {
    width: '19em',
    height: '19em',
  }

  const labelStyle = {
    display: 'none',
    fontWeight: 600,
    fontFamily: 'Founders Grotesk, Arial Black, sans-serif',
    fontSize: '1.2em',
    position: 'absolute',
    top: `${top}`,
    left: '0.8em',
    background: 'none',
    transformOrigin: '0 0',
    transform: 'rotate(270deg)',
    marginLeft: '3.5em',
    marginTop: '5em',
    color: '#1D3447',
  }


  return (
  <div className={`home__genres--${genre} genre`} style={genreContainer}  >
    <span className={`home__genres--${genre}-label genre-label`} style={labelStyle}>{genre === 'hiphop' ? 'Hip Hop' : firstLetterUpper(genre)}</span>
    <div className={`home__genres--${genre}-imgs genre-imgs`} style={imagesContainerStyle}>
        <img src={genreImages[`${genre}.jpg`]} alt={genre} className={`home__genres--${genre}-img`} style={imageStyle} />
    </div>
    <div className={`home__genres--${genre}-btn-container genre-btn-container`} >
      <Link className={`home__genres--${genre}-link genre-link`} to={genre === 'hiphop' ? '/shop/hip-hop' : `/shop/${genre}`}>
        <button className={`home__genres--${genre}-btn genre-btn`}>View {genre.toUpperCase()}</button>  
      </Link>
      <span className={`home--genres--${genre}-img-credit`}>{attribution}</span>
    </div>
  </div>
  )
}

export default Genre;