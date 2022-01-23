import { Link } from "react-router-dom";

const AlbumOfTheWeek = ({ albums }) => {

  const getMostPopularAlbum = () => {
    console.log(albums);
    const albumsPopularity = albums.map((album) => {
      const [artist, title] = album.title.split('-');
      return {
        title,
        artist,
        fullTitle: album.title,
        image: album.cover_image,
        albumPopularity: album.community.want + album.community.have,
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore ad placeat nihil, ducimus omnis excepturi corrupti velit provident nam architecto magnam deserunt officiis neque libero, dolorem facere sapiente repudiandae qui.',
        type: 'release',
        id: album.id,
      }
    });
    const albumsSorted = albumsPopularity.sort((a, b) => b.albumPopularity - a.albumPopularity);
    return {
      bestAlbum: albumsSorted[0],
      runnersUp: albumsSorted.slice(1, 11)
    }
  }

  const  { bestAlbum, runnersUp  } = getMostPopularAlbum();
  
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
          <div className="home__best--popular-albums">
            <div className="home__best--carousel-wrapper">
              <div className="home__best--carousel">
                {runnersUp.map((album) => (
                  <div className="home__best--popular-album" key={album.id}>
                    <div className="home__best--popular-album-img-wrapper">
                      <img src={album.image} alt={album.title} className="home__best--popular-album-img" />
                    </div>
                    <div className="home__best--popular-album-info">
                      <h5 className="home__best--popular-album-title">{album.title}</h5>
                      <span className="home__best--popular-album-artist">{album.artist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    )
  }

  return null;

}

export default AlbumOfTheWeek;