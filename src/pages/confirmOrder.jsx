import { React, useState, useEffect } from "react";
import styles from "./confirmOrder.module.css";

import Header from "../components/Header";
import Order from "../components/Order";

const ConfirmOrder = () => {
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
    </div>
  );
};

export default ConfirmOrder;
