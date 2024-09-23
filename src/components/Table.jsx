import { useState } from "react";
import { Loader } from "./Loader";
import useViewport from "../hooks/useViewport";

function Table({
  label,
  rowCount,
  titles,
  isRefreshing,
  showCollapse,
  pagination,
  children,
}) {
  const [width] = useViewport();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (e) => {
    if (e.target.classList.contains("table__wrapper")) {
      setIsOpen((state) => !state);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.page > 1) {
      pagination.setPage((page) => page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.page < pagination?.pageCount) {
      pagination.setPage((page) => page + 1);
    }
  };

  return (
    <div className="table__container">
      <div className="table__wrapper" onClick={handleClick}>
        <div className="flex-row-8">
          <p className="ft-p-regular">{label}</p>
          {isRefreshing ? <Loader classes="small" /> : <></>}
        </div>

        <div className="flex-row-16">
          <p className="ft-p-regular clr--gray">
            Pages: {pagination?.pageCount || 0}
          </p>

          <div className="flex-row-8">
            <Pagination
              onPrev={handlePrevPage}
              activePage={pagination?.page}
              onNext={handleNextPage}
            />

            {showCollapse && width <= 1088 ? (
              <TableToggle isOpen={isOpen} onOpen={setIsOpen} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {isOpen ? (
        <table className="table">
          <thead>
            <tr>
              {titles?.map((title, index) => (
                <th key={index} className="ft-txt-medium clr--gray">
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="table-body">{children}</tbody>

          <tfoot>
            {rowCount ? (
              <></>
            ) : (
              <tr>
                <td colSpan={titles.length}>
                  <div>
                    <p className="ft-p-regular clr--gray">No transactions</p>
                  </div>
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Table;

function TableToggle({ isOpen, onOpen }) {
  const handleClick = () => {
    onOpen((state) => !state);
  };

  return isOpen ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      onClick={handleClick}
    >
      <path
        d="M8 16C12.4182 16 16 12.4182 16 8C16 3.58172 12.4182 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4182 3.58172 16 8 16ZM4.37574 9.62424C4.14142 9.38992 4.14142 9.01008 4.37574 8.77576L7.57576 5.57574C7.81008 5.34142 8.18992 5.34142 8.42424 5.57574L11.6242 8.77576C11.8586 9.01008 11.8586 9.38992 11.6242 9.62424C11.3899 9.85856 11.0101 9.85856 10.7758 9.62424L8 6.84856L5.22426 9.62424C4.98995 9.85856 4.61005 9.85856 4.37574 9.62424Z"
        fill="#121212"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      onClick={handleClick}
    >
      <path
        d="M8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0ZM4.37574 6.37574C4.14142 6.61008 4.14142 6.98992 4.37574 7.22424L7.57576 10.4242C7.81008 10.6586 8.18992 10.6586 8.42424 10.4242L11.6242 7.22424C11.8586 6.98992 11.8586 6.61008 11.6242 6.37574C11.3899 6.14142 11.0101 6.14142 10.7758 6.37574L8 9.15144L5.22426 6.37574C4.98995 6.14142 4.61005 6.14142 4.37574 6.37574Z"
        fill="#121212"
      />
    </svg>
  );
}

function Pagination({ onPrev, activePage, onNext }) {
  return (
    <div className="pagination">
      <span className="pagination__btn clickable" onClick={onPrev}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M16 8C16 12.4182 12.4182 16 8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0C12.4182 0 16 3.58172 16 8ZM9.62424 4.37574C9.38992 4.14142 9.01008 4.14142 8.77576 4.37574L5.57574 7.57576C5.34142 7.81008 5.34142 8.18992 5.57574 8.42424L8.77576 11.6242C9.01008 11.8586 9.38992 11.8586 9.62424 11.6242C9.85856 11.3899 9.85856 11.0101 9.62424 10.7758L6.84856 8L9.62424 5.22426C9.85856 4.98995 9.85856 4.61005 9.62424 4.37574Z"
            fill="#121212"
          />
        </svg>
      </span>

      <div className="pagination__page clickable">
        <p className="ft-p-medium">{activePage}</p>
      </div>

      <span className="pagination__btn" onClick={onNext}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M0 8C0 3.58172 3.58172 0 8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16C3.58172 16 0 12.4182 0 8ZM6.37574 11.6242C6.61008 11.8586 6.98992 11.8586 7.22424 11.6242L10.4242 8.42424C10.6586 8.18992 10.6586 7.81008 10.4242 7.57576L7.22424 4.37574C6.98992 4.14142 6.61008 4.14142 6.37574 4.37574C6.14142 4.61005 6.14142 4.98995 6.37574 5.22426L9.15144 8L6.37574 10.7758C6.14142 11.0101 6.14142 11.3899 6.37574 11.6242Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
  );
}
