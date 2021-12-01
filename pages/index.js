import { connect } from "react-redux";

import Layout from "../components/Layout";

import styles from "../styles/Home.module.css";

function Home() {
  return (
    <Layout title="Home page">
      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Next.js!</a>
        </h1>
      </div>
    </Layout>
  );
}

export default connect((state) => state)(Home);
