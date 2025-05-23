import { React, useEffect, useState } from "react";
import styles from "./home.module.css";
import searchButton from "../assets/searchButton.png";

import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import drink from "../assets/drink.png";
import frenchFries from "../assets/frenchFries.png";
import veggies from "../assets/veggies.png";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentItems, setCurrentItems] = useState(null);

  useEffect(() => {
    setCurrentItems(items[selectedCategory]);
  }, [selectedCategory]);

  const categories = ["Burger", "Pizza", "Drink", "French fries", "Veggies"];
  const images = [burger, pizza, drink, frenchFries, veggies];

  const items = {
    Burger: {
      name: [
        "Chicken Burger",
        "Cheese Burger",
        "Veggie Burger",
        "Lamb Burger",
        "Paneer Burger",
        "Hawaiian Burger",
      ],
      img: [
        "https://feelgoodfoodie.net/wp-content/uploads/2025/04/Ground-Chicken-Burgers-09.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg",
        "https://www.finedininglovers.com/sites/default/files/body_images/vegie_burger.jpg",
        "https://www.themediterraneandish.com/wp-content/uploads/2024/06/Mediterranean-Dish_Grilled-Lamb-Burgers_LEAD_8.jpg",
        "https://www.dishbyrish.co.uk/wp-content/uploads/2023/08/DSC00019.jpg",
        "https://www.iheartnaptime.net/wp-content/uploads/2022/04/I-Heart-Naptime-teriyaki-burger-recipe.jpg",
      ],
      price: [220, 200, 180, 300, 320, 350],
    },

    Pizza: {
      name: [
        "New York",
        "Veggie",
        "Margherita",
        "BBQ Chicken",
        "Pepperoni",
        "Greek",
      ],
      img: [
        "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt979f347e81010907/66707f94c069766e585a6210/types-of-pizza-new-york.jpg?q=70&width=3840&auto=webp",
        "https://www.allrecipes.com/thmb/gKD4hlJ26TYEvBTrYzX2SiF95Io=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-15022-veggie-pizza-DDMFS-4x3-hero-3dabf0783ef544eeaa23bdf28b48b178.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spivack.jpg",
        "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
        "https://atsloanestable.com/wp-content/uploads/2023/06/new-york-style-pizza2.jpg",
        "https://carlsbadcravings.com/wp-content/uploads/2021/10/Greek-Pizza-1a.jpg",
      ],
      price: [250, 200, 180, 240, 280, 300],
    },

    Drink: {
      name: [
        "Frosé",
        "Watermelon Mint",
        "Mango Smoothie",
        "Cranberry Margarita",
        "Mojito",
        "Peach Bellini",
      ],
      img: [
        "https://www.realsimple.com/thmb/XhiWnZ_OipKvRHGZIlE6yvFLLTw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/frose-2000-3607ad202b024c1d98a97a7eb7073c8d.jpg",
        "https://www.realsimple.com/thmb/60j3AOmwJP9L3-nnntdTc3rhfEk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/watermelon-fresca-bd561afab084453d974cdd58a355942a.jpg",
        "https://www.realsimple.com/thmb/ObH5hRiXxyyV43DFcsqtKOBGyXE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Mango-juice_300-a276a65aa2c843f88f681544941e650e.jpg",
        "https://www.realsimple.com/thmb/AmY079Z01uZMqjswyUlNf2b1ZMk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1024DRINK_CranberryMargarita_01_preview-ba3740aec4bd409db97209956f995fdf.jpg",
        "https://www.realsimple.com/thmb/7EyNdZOdTZebw2kwwC8QG6GUcGQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vodka-mojito-recipe-5192553-step_05-43680e4632544c72b77d72b24f7a482e.jpg",
        "https://www.realsimple.com/thmb/asqBIZRfw8mEE1N66OWwQyKDQHc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bellini-recipe-GettyImages-1147319663-9c75cda55e38487786ec224e4df5af03.jpg",
      ],
      price: [130, 80, 100, 120, 90, 110],
    },

    "French fries": {
      name: [
        "Regular",
        "Crinkle Cut",
        "Potato Wedges",
        "Belgian Fries",
        "Tornado Fries",
        "Cheese Fries",
      ],
      img: [
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/traditional-cut-fries-1747434610.webp",
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/crinkle-cut-fries-1747434615.webp",
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/potato-wedges-1747434623.webp",
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/belgian-fries-1747434631.webp",
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/tornado-fries-1747434636.webp",
        "https://www.foodrepublic.com/img/gallery/30-different-types-of-french-fries-explained-upgrade/cheese-fries-1747434643.webp",
      ],
      price: [80, 100, 100, 150, 120, 180],
    },

    Veggies: {
      name: [
        "Vegan Pasta",
        "Cheese Lasagna",
        "Tomato Rigatoni",
        "Gnocchi",
        "Linguine",
        "Buckwheat Pasta",
      ],
      img: [
        "https://www.foodandwine.com/thmb/oHD89ty_sB7sflYg4P4fyCyAaFo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/green-pasta-FT-RECIPE0521-510d065cf45940fdb4e86b76000cfd80.jpg",
        "https://www.foodandwine.com/thmb/FaOZJTDtWTPwhM13hoZVunlWIug=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/three-cheese-lasagna-with-roasted-red-peppers-and-mushrooms-1-40b29e1013054893a908171291794d8c.jpg",
        "https://www.foodandwine.com/thmb/103XA24wBFrnWaK1mq7_raVkbvE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/FAW-recipes-creamy-tomato-rigatoni-hero-3069b1600c0641828a7269f676e12bd8.jpg",
        "https://www.foodandwine.com/thmb/82abZy80dECXQGCf1mj5vpAhxgw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/200611-r-xl-gnocchi-with-wild-mushrooms-ca87133b42fc4db3a7e58a695bc45108.jpg",
        "https://www.foodandwine.com/thmb/uwfMxEI4PZyXpKsnvN-ng5yn0rM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/200903-r-xl-linguine-with-red-cabbage-2000-cc841863d52f4707bcf827cd30fc2d0c.jpg",
        "https://www.foodandwine.com/thmb/2patCRWFkprSBD2D-yaApGsQdRM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/HD-200901-r-buckwheat-pasta-61e8f73d5882430396b3313decd89afe.jpg",
      ],
      price: [140, 210, 150, 180, 190, 210],
    },
  };

  return (
    <div className={styles.phoneContainer}>
      <div className={styles.headings}>
        <p className={styles.greeting}>Good evening</p>
        <p className={styles.instruction}>Place your order here</p>
      </div>
      <div className={styles.searchContainer}>
        <img src={searchButton}></img>
        <input type="text" placeholder="Search" />
      </div>
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
      <div className={styles.itemContainer}>
        <div className={styles.currentCategory}>
          <h1>{selectedCategory}</h1>
        </div>
        <div className={styles.items}>
          {currentItems ? (
            currentItems.name.map((item, index) => {
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.itemImgContainer}>
                    {currentItems.img && (
                      <img
                        src={currentItems.img[index]}
                        alt="itemImg"
                        srcset=""
                      />
                    )}
                  </div>
                  <div className={styles.infoContainer}>
                    <h1>{item}</h1>
                    <p>₹ {currentItems.price[index]}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Please choose a category to view items</h1>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.nextButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
