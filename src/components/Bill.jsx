import { React, useState, useEffect } from "react";
import styles from "./Bill.module.css";
import delLocation from "../assets/locationImg.png";
import delTime from "../assets/delTimeImg.png";

const Bill = ({
  typeOfOrder,
  delivTime,
  setUserName,
  setUserPhone,
  setUserAddress,
  setDelTime,
}) => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxes, setTaxes] = useState(0);

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order"));

    //setting delivery charge
    typeOfOrder === "Dine in" ? setDeliveryCharge(0) : setDeliveryCharge(50);

    //calculating total and time
    let itemTotal = 0;
    let tax = 0;
    let total = 0;
    let time = 0;
    if (order.length === 1) {
      itemTotal = order[0].price;
    } else {
      order.map((orderItem) => {
        itemTotal = itemTotal + Number(orderItem.price) * Number(orderItem.qty);
        time = time + Number(orderItem.time);
      });
    }
    console.log(time);
    tax = (0.18 * itemTotal).toFixed(2);
    total = itemTotal + deliveryCharge + tax;

    setOrderTotal(itemTotal);
    setTaxes(Number(tax));
    setDelTime(time);
  }, [typeOfOrder]);

  return (
    <>
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
      <hr />
      <div className={styles.userDetails}>
        <div className={styles.header}>
          <p>Your details</p>
        </div>
        <div className={styles.details}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter your number"
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>
      </div>
      <hr />
      {typeOfOrder === "Take Away" && (
        <>
          <div className={styles.deliveryDetails}>
            <div className={styles.delAddress}>
              <img src={delLocation} alt="" />
              <div className={styles.addressContainer}>
                <p>Delivery at</p>
                <input type="text" placeholder="Enter your address"></input>
              </div>
            </div>
            <div className={styles.delTime}>
              <img src={delTime} alt="" />
              <div className={styles.timeContainer}>
                <p>
                  Delivery in <b>{delivTime} mins</b>
                </p>
              </div>
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default Bill;
