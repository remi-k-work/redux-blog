// component css styles
import styles from "./TimeAgo.module.css";

// other libraries
import { parseISO, formatDistanceToNow } from "date-fns";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function TimeAgo({ timestamp }) {
  // Format a timestamp string into a relative description
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);

    // Create a user-friendly way to read the date
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className={styles["time-ago"]} title={timestamp}>
      <ClockIcon width={24} height={24} />
      {timeAgo}
    </span>
  );
}
