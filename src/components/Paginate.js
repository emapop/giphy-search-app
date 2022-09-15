import React from "react";

const Paginate = (props) => {
  const pageNumbers = [];
  //this function divides the total amount of gifs retrived with the number of item assigned in itemsPerPage state variable which is passed as a prop
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="nav-pagination">
      <ul className="pagination">
        {/* this function displays the page number dynamically from the pageNumbers array */}
        {pageNumbers.map((number, index) => {
          return (
            <li key={index} className="page-item">
              {/*If the page number is clicked you will access that page with gifs */}
              <a
                onClick={() => props.pageSelected(number)}
                href="#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Paginate;
