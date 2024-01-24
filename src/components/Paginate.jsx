// component css styles
import styles from "./Paginate.module.css";

export default function Paginate({ currentPage, itemsPerPage, totalItems, onPageChanged }) {
  function handlePrevPageClicked() {
    if (currentPage !== 1) {
      onPageChanged(--currentPage);
    }
  }

  function handleNextPageClicked() {
    if (currentPage !== Math.ceil(totalItems / itemsPerPage)) {
      onPageChanged(++currentPage);
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <ul className={styles["paginate"]}>
        <li className={styles["paginate__page-number"]} onClick={handlePrevPageClicked}>
          &laquo;
        </li>
        {pageNumbers.map((pageNumber) =>
          pageNumber === currentPage ? (
            <li key={pageNumber} className={styles["paginate__page-current"]}>
              {pageNumber}
            </li>
          ) : (
            <li key={pageNumber} className={styles["paginate__page-number"]} onClick={() => onPageChanged(pageNumber)}>
              {pageNumber}
            </li>
          )
        )}
        <li className={styles["paginate__page-number"]} onClick={handleNextPageClicked}>
          &raquo;
        </li>
      </ul>
    )
  );
}
