// component css styles
import styles from "./Root.module.css";

// rrd imports
import { Outlet, ScrollRestoration } from "react-router-dom";

// components
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <div className={styles["root"]}>
      <Header />
      <NavBar />
      <main>
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
