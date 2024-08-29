import "./Pagination.scss";
import PropTypes from "prop-types";

Pagination.propTypes = {
  numPages: PropTypes.number,
  activePage: PropTypes.number,
  onPage: PropTypes.func,
};

function Pagination({ numPages, activePage, onPage }) {
  return (
    <div className="pagination">
      {Array.from({ length: numPages }, (_, i) => (
        <div
          key={i}
          className={`page ${i === activePage ? "active" : "inactive"}`}
          onClick={() => onPage(i)}
        >
          <p className="ft-txt-medium">{i + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
