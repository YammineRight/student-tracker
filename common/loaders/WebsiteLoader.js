import React from "react";
import styles from "../../styles/Loading.module.css";

function WebsiteLoader(props) {
  return (
    <div className={props.loading ? styles.body_loading : styles.none}>
        <img src="/logo.svg" alt="logo" className={styles.logo} />
        <h1 className={styles.title}>Courses Overflow</h1>
    </div>
  );
}

export default WebsiteLoader;