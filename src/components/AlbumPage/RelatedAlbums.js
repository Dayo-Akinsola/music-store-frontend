import Album from '../ShopPage/Album';

const RelatedAlbums = ({ relatedAlbums }) => {
  return (
    <div className="album-page__details--related-wrapper">
      <h3 className="album-page__details--related-heading">Albums You Might Like</h3>
      <div className="album-page__details--related-albums">
        {relatedAlbums.map(relatedAlbum => <Album album={relatedAlbum} key={relatedAlbum.id} /> )}
      </div>
    </div>
  )
}

export default RelatedAlbums;