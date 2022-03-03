import { Link } from "react-router-dom";

const Pagination = ({ pages, searchParams }) => {
  const currPage = parseInt(searchParams.get('page'));

  /* function to only show 6 pagination links on a page at a time */
  const pageLinksToShow = (index) => {
    if (currPage === 1 || currPage === 2 || currPage === 3){
     if (index + 1 < currPage - 3 || index + 1 > 6) {
       return true
     }
    } else if (currPage === pages.length  || currPage === pages.length - 1 || currPage === pages.length - 2) {
        if (index + 1 < pages.length - 5) {
          return true;
        }  
      } else {
        if (index + 1 < currPage - 3 || index + 1 > currPage + 2) {
          return true;
        }
      }
    return false;
  }

  return (
    <ul className="shop__pagination">
      {
        pages.map((page, index) => (
          (pageLinksToShow(index)) ?
            (index === 0 || index === pages.length - 1) ? <li key={index}>...</li> : null
            :
            <li key={index} className="shop__pagination--page-num">
              <Link className={`shop__pagination--page-link${currPage === index + 1 ? ' active' : ''}`} to={`?page=${index + 1}`}>{index + 1}</Link>
            </li>
        ))
      }
    </ul>
  )
}

export default Pagination;