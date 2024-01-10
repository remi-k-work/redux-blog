// component css styles
import styles from "./Root.module.css";

// rrd imports
import { Outlet, ScrollRestoration } from "react-router-dom";

// components
import Header from "../components/Header";

export default function Root() {
  return (
    <div className={styles["root"]}>
      <Header />
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
