import { React, useEffect, useState } from "react";
import styles from "./home.module.css";

import Header from "../components/Header";
import Items from "../components/Items";

import { fetchFoodData } from "../services/index";

import { useNavigate } from "react-router-dom";

import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import drink from "../assets/drink.png";
import frenchFries from "../assets/frenchFries.png";
import veggies from "../assets/veggies.png";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Burger");
  const [currentItems, setCurrentItems] = useState([]);

  const categories = ["Burger", "Pizza", "Drink", "French fries", "Veggies"];
  const images = [burger, pizza, drink, frenchFries, veggies];

  useEffect(() => {
    const handleSelectCategory = async () => {
      if (localStorage.getItem(selectedCategory) === null) {
        try {
          const res = await fetchFoodData(selectedCategory);
          setCurrentItems(
            res.data.map((item) => {
              return {
                ...item,
                qty: 0, // Initialize quantity to 0
              };
            })
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        setCurrentItems(JSON.parse(localStorage.getItem(selectedCategory)));
      }
    };
    handleSelectCategory();
  }, [selectedCategory]);

  const updateCurrentItems = (items) => {
    setCurrentItems(items);
  };

  const goNext = () => {
    localStorage.setItem("order", JSON.stringify(currentItems));
    navigate("/confirm-order");
  };

  return (
    <div className={styles.phoneContainer}>
      <Header />
      <div className={styles.categoriesContainer}>
        {categories.map((category, index) => {
          return (
            <div
              className={styles.categoryContainer}
              key={index}
              onClick={() => {
                setSelectedCategory(category);
              }}
            >
              <div className={styles.imgContainer}>
                <img src={images[index]}></img>
              </div>
              <div className={styles.titleContainer}>
                <p>{category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory.length > 0 ? (
        <>
          <Items
            selectedCategory={selectedCategory}
            currentItems={currentItems}
            setCurrentItems={updateCurrentItems}
          />

          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.nextButton}
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h1 style={{ marginTop: "7vh" }}>Select a category to continue</h1>
      )}
    </div>
  );
};

export default Home;
