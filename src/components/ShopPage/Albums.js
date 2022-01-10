import Album from './Album';

const Albums = ({ albums }) => {
  return (
    <div className="shop__albums">
      {albums.map(album => <Album album={album} key={album.id} />)}
    </div>
  )
}

export default Albums;