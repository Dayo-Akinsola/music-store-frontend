import Genre from './Genre';

const Genres = () => {
  
  return(
    <div className="home__genres">  
      <div className="home__genres--title-wrapper home__sub-title-wrapper">
        <span className="home__genres--title home__sub-title">Genres</span>
      </div>
      <div className="home__genres--content">
        <Genre genre='pop' bgColor='#fae1dd'  />
        <Genre genre='rock' bgColor='#cfbaf0' />
        <Genre genre='hiphop' bgColor='#bbdefb'  />
        <Genre genre='electronic' bgColor='#fbf8cc'  />
        <Genre genre='jazz' bgColor='#caffbf' />
      </div>
    </div>
  )     
  
}

export default Genres;