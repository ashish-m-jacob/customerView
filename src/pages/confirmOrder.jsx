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
        <span className={styles.cookingInstructions}>
          Add cooking instructions (optional)
        </span>
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
