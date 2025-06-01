import { React, useState, useEffect } from "react";
import styles from "./Order.module.css";
const Order = ({ order, setOrder }) => {
  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem("order")));

    console.log(`Current order: ${order}`);
  }, []);

  const decreaseQty = (orderItem, index) => {
    const items = [...order];

    const newQty = orderItem.qty - 1;
    items[index] = { ...items[index], qty: newQty };

    setOrder(items);

    localStorage.setItem("order", JSON.stringify(order));
    //setting data for home page to match order page
    const currentItems = JSON.parse(localStorage.getItem(orderItem.category));

    currentItems[index].qty = newQty;
    localStorage.setItem(orderItem.category, JSON.stringify(currentItems));
  };

  const increaseQty = (orderItem, index) => {
    const items = JSON.parse(localStorage.getItem("order"));

    const newQty = orderItem.qty + 1;

    items[index] = { ...items[index], qty: newQty };

    setOrder(items);

    localStorage.setItem("order", JSON.stringify(items));

    //setting data for home page to match order page
    const currentItems = JSON.parse(localStorage.getItem(orderItem.category));

    currentItems[index].qty = newQty;
    localStorage.setItem(orderItem.category, JSON.stringify(currentItems));
  };

  const removeItem = (orderItem, index) => {
    const currentItems = JSON.parse(localStorage.getItem(orderItem.category));

    currentItems.map((currentItem) => {
      if (currentItem.name === orderItem.name) {
        currentItem.qty = 0;
      }
    });

    localStorage.setItem(orderItem.category, JSON.stringify(currentItems));

    const newArray = order.filter((item, i) => i !== index);

    setOrder(newArray);

    localStorage.setItem("order", JSON.stringify(newArray));

    //setting data for home page to match order page
  };

  return (
    <div className={styles.orderContainer}>
      {JSON.parse(localStorage.getItem("order")).map((orderItem, index) => {
        return (
          <div className={styles.order} key={index}>
            <div className={styles.pictureContainer}>
              <img src={orderItem.img} alt="" srcSet="" />
            </div>
            <div className={styles.details}>
              <div className={styles.titleAndClose}>
                <p className={styles.title}>{orderItem.name}</p>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => {
                    removeItem(orderItem, index);
                  }}
                >
                  X
                </button>
              </div>
              <div className={styles.price}>
                <p>₹{orderItem.price}</p>
              </div>
              <div className={styles.qtyContainer}>
                <button
                  type="button"
                  className={styles.changeQty}
                  onClick={() => {
                    decreaseQty(orderItem, index);
                  }}
                  disabled={orderItem.qty === 1 ? true : false}
                  style={{ opacity: orderItem.qty === 1 ? 0.6 : 1 }}
                >
                  -
                </button>
                <p>{orderItem.qty}</p>
                <button
                  type="button"
                  className={styles.changeQty}
                  onClick={() => {
                    increaseQty(orderItem, index);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
