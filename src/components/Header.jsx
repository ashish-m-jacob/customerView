import React from "react";
import styles from "./Header.module.css";
import searchButton from "../assets/searchButton.png";
const Header = () => {
  return (
    <>
      <div className={styles.headings}>
        <p className={styles.greeting}>Good evening</p>
        <p className={styles.instruction}>Place your order here</p>
      </div>
      <div className={styles.searchContainer}>
        <img src={searchButton}></img>
        <input type="text" placeholder="Search" />
      </div>
    </>
  );
};

export default Header;
