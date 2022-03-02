import { Link } from "react-router-dom";

const AlbumSection = ({ bestAlbum }) => {
  const { place } = bestAlbum;
  let placing;

  if (place === 1) {
    placing = '1st'
  } else if (place === 2) {
    placing = '2nd'
  } else {
    placing = '3rd'
  }

  return (
     <div className={`home__best--album-section album-${placing}`}>
      <div className="home__best--placing-wrapper">
        <span className="home__best--placing">{placing} Place</span>
      </div>
      <div className="home__best--featured-album-wrapper">
        <Link 
          className="home__best--featured-album-link" 
          to={`/shop/${encodeURIComponent(bestAlbum.fullTitle).replaceAll('%20', '-').replace('---', '-')}/${bestAlbum.type}/${bestAlbum.id}`}>
          <img src={bestAlbum.image} alt={bestAlbum.title} className="home__best--featured-album-img" />
        </Link>
        <div className="home__best--featured-album-info">
          <Link 
            className="home__best--featured-album-link" 
            to={`/shop/${encodeURIComponent(bestAlbum.fullTitle).replaceAll('%20', '-').replace('---', '-')}/${bestAlbum.type}/${bestAlbum.id}`}>
            <h4 className="home__best--featured-album-title">{bestAlbum.title}</h4>
            <span className="home__best--featured-album-artist">{bestAlbum.artist}</span>
          </Link>
          <p className="home__best--features-album--description">{bestAlbum.description}</p>
        </div>
      </div>
    </div>
  )
}

export default AlbumSection;