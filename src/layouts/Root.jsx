// component css styles
import styles from "./Root.module.css";

// rrd imports
import { Outlet, ScrollRestoration } from "react-router-dom";

// components
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function Root() {
  return (
    <div className={styles["root"]}>
      <Header />
      <Nav />
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}
