// component css styles
import styles from "./ViewUserDetails.module.css";

// rrd imports
import { useParams } from "react-router-dom";

// components
import SingleUserView from "../../features/users/components/SingleUserView";

export default function ViewUserDetails() {
  const { userId } = useParams();

  return (
    <article className={styles["view-user-details"]}>
      <SingleUserView userId={Number(userId)} />
    </article>
  );
}
