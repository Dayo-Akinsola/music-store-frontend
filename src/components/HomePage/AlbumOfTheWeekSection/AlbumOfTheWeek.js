import AlbumSection from "./AlbumSection";

const AlbumOfTheWeek = ({ bestAlbums }) => {
  
  if (bestAlbums) {
    return (
      <div className="home__best">
          <div className="home__best--title-wrapper home__sub-title-wrapper">
            <span className="home__best--title home__sub-title">Album Of The Week</span>
          </div>
          <div className="home__best--albums-section">
            {
              bestAlbums.map((bestAlbum) => (
                <AlbumSection key={bestAlbum.id} bestAlbum={bestAlbum} />
              ))
            }
          </div>
      </div>
    )
  }

  return null;

}

export default AlbumOfTheWeek;