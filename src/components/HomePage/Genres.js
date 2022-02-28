import Genre from './Genre';

const Genres = () => {
  
  return(
    <div className="home__genres">  
      <div className="home__genres--title-wrapper home__sub-title-wrapper">
        <span className="home__genres--title home__sub-title">Genres</span>
      </div>
      <div className="home__genres--content">
        <Genre genre='pop'  />
        <Genre genre='rock' />
        <Genre genre='hiphop'  />
        <Genre genre='electronic'  />
        <Genre genre='jazz' />
      </div>
    </div>
  )     
  
}

export default Genres;