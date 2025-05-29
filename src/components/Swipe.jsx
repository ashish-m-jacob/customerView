import React from "react";
import styles from "./Swipe.module.css";
import arrowMark from "../assets/arrowMark.png";

const Swipe = () => {
  return (
    <div className={styles.swipeSection}>
      <div className={styles.swipeContainer}>
        <div className={styles.swipeButton}>
          <button type="button">
            <img src={arrowMark} alt="" srcset="" />
          </button>
        </div>
        <div className={styles.swipeText}>
          <p>Swipe to Order</p>
        </div>
      </div>
    </div>
  );
};

export default Swipe;
