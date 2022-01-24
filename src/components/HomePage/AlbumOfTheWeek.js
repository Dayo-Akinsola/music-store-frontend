import { Link } from "react-router-dom";

const AlbumOfTheWeek = ({ getMostPopularAlbum }) => {

  const  { bestAlbum } = getMostPopularAlbum();
  
  if (bestAlbum) {
    return (
      <div className="home__best">
          <div className="home__best--title-wrapper home__sub-title-wrapper">
            <span className="home__best--title home__sub-title">Album Of The Week</span>
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

  return null;

}

export default AlbumOfTheWeek;