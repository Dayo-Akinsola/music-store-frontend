import Album from './Album';

const Albums = ({ pages, searchParams }) => {
  
  return (
    <div className="shop__albums">
      {
        pages.map((page, index) => (
          page.map((album) => (
            <Album album={album} key={album.id} pageNum={index + 1} searchParams={searchParams} />
          ))
        ))
      }
    </div>
  )
}

export default Albums;