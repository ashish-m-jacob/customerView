import { React, useState, useEffect } from "react";

import styles from "./Items.module.css";

import ItemCard from "./ItemCard";

const Items = ({ selectedCategory, currentItems, setCurrentItems }) => {
  const handleAdd = (item, index) => {
    const items = [...currentItems];

    const newQty = item.qty + 1;
    console.log(newQty);
    items[index] = { ...items[index], qty: newQty };

    setCurrentItems(items);

    localStorage.setItem(selectedCategory, JSON.stringify(items));
  };

  const handleMinus = (item, index) => {
    const items = [...currentItems];

    const newQty = item.qty - 1;
    console.log(newQty);
    items[index] = { ...items[index], qty: newQty };

    setCurrentItems(items);

    localStorage.setItem(selectedCategory, JSON.stringify(items));
  };

  return (
    <>
      {selectedCategory && (
        <div className={styles.itemContainer}>
          <div className={styles.currentCategory}>
            <h1>{selectedCategory}</h1>
          </div>
          <div className={styles.items}>
            {currentItems.map((item, index) => {
              return (
                <ItemCard
                  item={item}
                  index={index}
                  handleAdd={handleAdd}
                  handleMinus={handleMinus}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Items;
