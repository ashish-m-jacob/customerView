import { React, useState, useEffect } from "react";
import styles from "./Bill.module.css";

const Bill = ({ typeOfOrder }) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxes, setTaxes] = useState(0);

  useEffect(() => {
    console.log("Bill triggered");
    const order = JSON.parse(localStorage.getItem("order"));

    //setting delivery charge
    typeOfOrder === "Dine in" ? setDeliveryCharge(0) : setDeliveryCharge(50);

    //calculating total
    let itemTotal = 0;
    let tax = 0;
    let total = 0;
    if (order.length === 1) {
      itemTotal = order[0].price;
    } else {
      order.map((orderItem) => {
        itemTotal = itemTotal + Number(orderItem.price) * Number(orderItem.qty);
      });
    }
    tax = (0.18 * itemTotal).toFixed(2);
    total = itemTotal + deliveryCharge + tax;

    setOrderTotal(itemTotal);
    setTaxes(Number(tax));
  }, [typeOfOrder]);
  return (
    <div className={styles.billContainer}>
      <div className={styles.itemTotal}>
        <p>Item Total</p>
        <p>₹{orderTotal}.00</p>
      </div>
      <div className={styles.deliveryCharge}>
        <span>Delivery Charge</span>
        <p>₹{deliveryCharge}</p>
      </div>
      <div className={styles.taxes}>
        <p>Taxes</p>
        <p>₹{taxes}</p>
      </div>

      <div className={styles.grandTotal}>
        <p>Grand Total</p>
        <p>₹{orderTotal + deliveryCharge + taxes}</p>
      </div>
    </div>
  );
};

export default Bill;
