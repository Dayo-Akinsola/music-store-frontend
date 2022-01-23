import { Link } from "react-router-dom"
import firstLetterUpper from "./helpers/firstLetterUpper"

const Genre = ({ topAlbums, genre, bgColor, top}) => {

  const genreContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1.5em auto',
    width: '28em',
    position: 'relative',
    marginBottom: '2em',
  }
  
  const imagesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    margin: 'auto',
    borderWidth: '2px 2px 2px 34px',
    borderStyle: 'solid',
    borderColor: `white white white ${bgColor}`,
    padding: '0.3em',
    backgroundColor: `${bgColor}`,
  }
  const imageStyle = {
    width: '8em',
    height: '8em',
  }

  const labelStyle = {
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
      {topAlbums[`${genre}`].map((album) => (
        <img src={album.image} alt={album.title} key={album.id} className={`home__genres--${genre}-img`} style={imageStyle} />
      ))}
    </div>
    <div className={`home__genres--${genre}-btn-container genre-btn-container`} >
      <Link className={`home__genres--${genre}-link genre-link`} to={genre === 'hiphop' ? '/shop/hip-hop' : `/shop/${genre}`}>
        <button className={`home__genres--${genre}-btn genre-btn`}>View {genre.toUpperCase()}</button>
      </Link>
    </div>
  </div>
  )
}

export default Genre;