// component css styles
import styles from "./Paginate.module.css";

export default function Paginate({ itemsPerPage, totalItems, onPageClicked, onPrevPage, onNextPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className={styles["paginate"]}>
      <ul className={styles["paginate__pagination"]}>
        <li className={styles["paginate__page-number"]} onClick={onPrevPage}>
          &laquo; Prev
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={styles["paginate__page-number"]} onClick={() => onPageClicked(pageNumber)}>
            {pageNumber}
          </li>
        ))}
        <li className={styles["paginate__page-number"]} onClick={onNextPage}>
          Next &raquo;
        </li>
      </ul>
    </section>
  );
}
