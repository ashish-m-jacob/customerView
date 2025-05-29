import { React, useState, useEffect } from "react";
import styles from "./Order.module.css";
const Order = () => {
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem("order")));
  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem("order")));
  }, []);

  return (
    <div className={styles.orderContainer}>
      {order.map((orderItem, index) => {
        return (
          <div className={styles.order} key={index}>
            <div className={styles.pictureContainer}>
              <img src={orderItem.img} alt="" srcset="" />
            </div>
            <div className={styles.details}>
              <div className={styles.titleAndClose}>
                <p className={styles.title}>{orderItem.name}</p>
                <button type="button" className={styles.close}>
                  x
                </button>
              </div>
              <div className={styles.price}>
                <p>₹{orderItem.price}</p>
              </div>
              <div className={styles.qtyContainer}>
                <button type="button" className={styles.changeQty}>
                  -
                </button>
                <p>{orderItem.qty}</p>
                <button type="button" className={styles.changeQty}>
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
