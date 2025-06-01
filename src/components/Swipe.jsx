import { React, useState } from "react";
import styles from "./Swipe.module.css";
import arrowMark from "../assets/arrowMark.png";
import { useNavigate } from "react-router-dom";

const Swipe = ({ name, phone, address, orderType, placeOrder }) => {
  const navigate = useNavigate();

  const [startX, setStartX] = useState(0);

  const checkBeforeSubmit = () => {
    let order = JSON.parse(localStorage.getItem("order"));

    //if cart is empty
    if (order.length === 0) {
      alert("Add items to your cart!");
      navigate("/");
      return;
    }

    //empty details
    if (name.length === 0 || phone.length === 0) {
      alert("Please fill all the requested details!");
      return;
    } else if (orderType === "Take Away" && address.length === 0) {
      alert("Please fill all the requested details!");
      return;
    }

    //try pushing data to the db
    placeOrder();

    return;
  };
  return (
    <div className={styles.swipeSection}>
      <div className={styles.swipeContainer}>
        <div className={styles.swipeButton}>
          <button
            type="button"
            onTouchStart={(e) => {
              setStartX(e.touches[0].clientX);
            }}
            onTouchEnd={(e) => {
              const endX = e.changedTouches[0].clientX;

              const swipeDistance = endX - startX;

              if (Math.abs(swipeDistance) > 50) {
                checkBeforeSubmit();
              }
            }}
          >
            <img src={arrowMark} alt="" srcSet="" />
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
