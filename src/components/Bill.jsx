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
  order,
  totalCost,
  setTotalCost,
  deliveryCharge,
  setDeliveryCharge,
  taxes,
  setTaxes,
}) => {
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    let delivery = 0;
    typeOfOrder === "Dine in" ? (delivery = 0) : (delivery = 50);
    //calculating total and time
    let itemTotal = 0;
    let tax = 0;
    let time = 0;
    if (order.length === 1) {
      itemTotal = Number(order[0].price);
      time = order[0].time;
    } else {
      order.map((orderItem) => {
        itemTotal = itemTotal + Number(orderItem.price) * Number(orderItem.qty);
        time = time + Number(orderItem.time);
      });
    }
    tax = (0.18 * itemTotal).toFixed(2);

    setDeliveryCharge(delivery);
    setOrderTotal(itemTotal);
    setTaxes(Number(tax));
    setTotalCost(itemTotal + Number(tax) + delivery);
    setDelTime(time);
  }, [order, typeOfOrder]);

  return (
    <>
      <div className={styles.billContainer}>
        {" "}
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
          <p>₹{totalCost}</p>
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
      {typeOfOrder === "Take Away" ? (
        <>
          <div className={styles.deliveryDetails}>
            <div className={styles.delAddress}>
              <img src={delLocation} alt="" />
              <div className={styles.addressContainer}>
                <p>Delivery at</p>
                <input
                  type="text"
                  placeholder="Enter your address"
                  onChange={(e) => setUserAddress(e.target.value)}
                ></input>
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
      ) : (
        <>
          <div
            className={styles.delTime}
            style={{ marginTop: "1vh", marginBottom: "1vh", padding: "1vh" }}
          >
            <img src={delTime} alt="" />
            <div className={styles.timeContainer}>
              <p>
                Delivery in <b>{delivTime} mins</b>
              </p>
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default Bill;
