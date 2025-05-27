import React from "react";
import styles from "./ItemCard.module.css";

const ItemCard = ({ item, index, handleAdd, handleMinus }) => {
  return (
    <div className={styles.item} key={index}>
      <div className={styles.itemImgContainer}>
        {<img src={item.img} alt="itemImg" srcSet="" />}
      </div>
      <div className={styles.infoContainer}>
        <h1>{item.name}</h1>
        <div className={styles.priceContainer}>
          <p>₹ {item.price && item.price}</p>

          {item.qty === 0 ? (
            <div className={styles.plusButton}>
              <p
                className={styles.addButton}
                onClick={() => {
                  handleAdd(item, index);
                }}
              >
                +
              </p>
            </div>
          ) : (
            <div className={styles.addMinusContainer}>
              <button
                type="button"
                className={styles.minus}
                onClick={() => {
                  handleMinus(item, index);
                }}
              >
                -
              </button>
              <p>{item.qty && item.qty}</p>
              <button
                type="button"
                className={styles.plus}
                onClick={() => {
                  handleAdd(item, index);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
