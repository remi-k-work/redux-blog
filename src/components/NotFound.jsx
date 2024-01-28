// component css styles
import styles from "./NotFound.module.css";

// other libraries
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function NotFound({ message }) {
  return (
    <h3 className={styles["not-found"]} role="alert">
      <ExclamationTriangleIcon width={48} height={48} />
      {message}
    </h3>
  );
}
