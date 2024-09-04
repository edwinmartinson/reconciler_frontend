import PropTypes from "prop-types";

Pagination.propTypes = {
  numPages: PropTypes.number,
  activePage: PropTypes.number,
  onPage: PropTypes.func,
};

// function Pagination({ numPages, activePage, onPage }) {
//   return (
//     <div className="pagination">
//       {Array.from({ length: numPages }, (_, i) => (
//         <div
//           key={i}
//           className={`page ${i + 1 === activePage ? "active" : "inactive"}`}
//           onClick={() => onPage(i + 1)}
//         >
//           <p className="ft-txt-medium">{i + 1}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

function Pagination({ numPages, activePage, onPage }) {
  return (
    <div className="pagination">
      <span className="pagination__btn-back">
        <svg width="24" height="25" viewBox="0 0 24 24" fill="none">
          <path
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM14.4364 6.5636C14.0849 6.21214 13.5151 6.21214 13.1636 6.5636L8.3636 11.3636C8.01214 11.7151 8.01214 12.2849 8.3636 12.6364L13.1636 17.4364C13.5151 17.7878 14.0849 17.7878 14.4364 17.4364C14.7878 17.0849 14.7878 16.5151 14.4364 16.1636L10.2728 12L14.4364 7.8364C14.7878 7.48493 14.7878 6.91507 14.4364 6.5636Z"
            fill="#121212"
          />
        </svg>
      </span>

      <div className="pagination__page">
        <p className="ft-p-medium">1</p>
      </div>

      <span className="pagination__btn-next">
        <svg width="24" height="25" viewBox="0 0 24 24" fill="none">
          <path
            d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM9.5636 17.4364C9.91512 17.7878 10.4849 17.7878 10.8364 17.4364L15.6364 12.6364C15.9878 12.2849 15.9878 11.7151 15.6364 11.3636L10.8364 6.5636C10.4849 6.21214 9.91512 6.21214 9.5636 6.5636C9.21214 6.91507 9.21214 7.48493 9.5636 7.8364L13.7272 12L9.5636 16.1636C9.21214 16.5151 9.21214 17.0849 9.5636 17.4364Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
  );
}

export default Pagination;
