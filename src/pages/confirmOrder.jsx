import { React, useState, useEffect } from "react";
import styles from "./confirmOrder.module.css";

import Header from "../components/Header";
import Order from "../components/Order";

const ConfirmOrder = () => {
  const [typeOfOrder, setTypeOfOrder] = useState("Dine in");

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
    console.log(localStorage.getItem("order"));
  }, []);

  return (
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
  );
};

export default ConfirmOrder;
