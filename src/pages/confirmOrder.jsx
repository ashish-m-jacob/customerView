import { React, useState, useEffect } from "react";
import styles from "./confirmOrder.module.css";

import Header from "../components/Header";
import Order from "../components/Order";
import Bill from "../components/Bill";
import Swipe from "../components/Swipe";

const ConfirmOrder = () => {
  const [typeOfOrder, setTypeOfOrder] = useState("Dine in");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [delTime, setDelTime] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [isInstructionsSelected, setIsInstructionsSelected] = useState(false);

  useEffect(() => {
    let orderItems = [];
    const categories = ["Burger", "Pizza", "Drink", "French fries", "Veggies"];

    categories.forEach((category) => {
      const items = localStorage.getItem(category);
      if (items !== null) {
        JSON.parse(items).forEach((categoryItem) => {
          if (categoryItem.qty > 0) {
            orderItems.push(categoryItem);
          }
        });
      }
    });

    localStorage.setItem("order", JSON.stringify(orderItems));
  }, []);

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
  };

  const updateUserPhone = (newUserPhone) => {
    setUserPhone(newUserPhone);
  };

  const updateUserAddress = (newAddress) => {
    setUserAddress(newAddress);
  };

  const updateDelTime = (newDelTime) => {
    setDelTime(newDelTime);
  };

  return (
    <>
      <div className={styles.phoneContainer}>
        <Header />
        <Order />
        <span
          className={styles.cookingInstructions}
          onClick={() => {
            setIsInstructionsSelected(true);
          }}
        >
          Add cooking instructions (optional)
        </span>
        {isInstructionsSelected && (
          <div className={styles.instructionsContainer}>
            <div className={styles.blur}></div>
            <div className={styles.instructions}>
              <div className={styles.closeButton}>
                <button
                  type="button"
                  onClick={() => {
                    setIsInstructionsSelected(false);
                    setInstructions("");
                  }}
                >
                  X
                </button>
              </div>
              <div className={styles.instructionsBox}>
                <p className={styles.instructionsTitle}>
                  Add Cooking Instructions
                </p>
                <div className={styles.instructionsInput}>
                  <textarea
                    onChange={(e) => {
                      setInstructions(e.target.value);
                    }}
                  ></textarea>
                </div>
                <p className={styles.disclaimer}>
                  The restaurant will try its best to follow your request.
                  However, refunds or cancellations in this regard won’t be
                  possible
                </p>
                <div className={styles.buttonsBox}>
                  <div className={styles.cancelDiv}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsInstructionsSelected(false);
                        setInstructions("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className={styles.nextDiv}>
                    <button type="button" className={styles.nextButton}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.dineInTakeout}>
          <p
            style={{
              backgroundColor:
                typeOfOrder === "Dine in" ? "white" : "transparent",
            }}
            onClick={() => setTypeOfOrder("Dine in")}
          >
            Dine in
          </p>
          <p
            style={{
              backgroundColor:
                typeOfOrder === "Take Away" ? "white" : "transparent",
            }}
            onClick={() => setTypeOfOrder("Take Away")}
          >
            Take Away
          </p>
        </div>
      </div>
      <Bill
        typeOfOrder={typeOfOrder}
        delivTime={delTime}
        setUserName={updateUserName}
        setUserPhone={updateUserPhone}
        setUserAddress={updateUserAddress}
        setDelTime={updateDelTime}
      />
      <Swipe />
    </>
  );
};

export default ConfirmOrder;
