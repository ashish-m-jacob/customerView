import { React, useState, useEffect } from "react";
import styles from "./confirmOrder.module.css";

import Header from "../components/Header";
import Order from "../components/Order";
import Bill from "../components/Bill";
import Swipe from "../components/Swipe";

import { sendOrder } from "../services";

import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  //order of data for sending to database
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [itemsArray, setItemsArray] = useState([]);
  const [qtyArray, setQtyArray] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [typeOfOrder, setTypeOfOrder] = useState("Dine in");

  //for UI
  const [order, setOrder] = useState([]);
  const [delTime, setDelTime] = useState(0);
  const [isInstructionsSelected, setIsInstructionsSelected] = useState(false);

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

    console.log(JSON.parse(localStorage.getItem("order")));

    let tempItems = [];
    let tempQty = [];
    JSON.parse(localStorage.getItem("order")).map((orderItem) => {
      (tempItems = [...tempItems, orderItem.name]),
        (tempQty = [...tempQty, orderItem.qty]);
    });

    //updating variables

    setItemsArray(tempItems);
    setQtyArray(tempQty);
  }, []);

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
  };

  const updateUserPhone = (newUserPhone) => {
    setUserPhone(newUserPhone);
  };

  const updateUserAddress = (newAddress) => {
    setUserAddress(newAddress);
  };

  const updateDelTime = (newDelTime) => {
    setDelTime(newDelTime);
  };

  const updateOrder = (newOrder) => {
    setOrder(newOrder);

    let tempItems = [];
    let tempQty = [];

    newOrder.map((orderItem) => {
      (tempItems = [...tempItems, orderItem.name]),
        (tempQty = [...tempQty, orderItem.qty]);
    });

    setItemsArray(tempItems);
    setQtyArray(tempQty);
  };

  const updateTotalCost = (newCost) => {
    setTotalCost(newCost);
  };

  const updateDeliveryCharge = (newDeliveryCharge) => {
    setDeliveryCharge(newDeliveryCharge);
  };

  const updateTaxes = (newTaxes) => {
    setTaxes(newTaxes);
  };

  const placeOrder = async () => {
    try {
      const res = await sendOrder(
        userName,
        userPhone,
        userAddress,
        itemsArray,
        qtyArray,
        totalCost,
        deliveryCharge,
        taxes,
        instructions,
        typeOfOrder
      );

      console.log(res.status);
      if (res.status === 201) {
        alert("Order placed successfully!");
        //reset all data
        const categories = [
          "Burger",
          "Pizza",
          "Drink",
          "French fries",
          "Veggies",
        ];
        categories.map((category) => {
          localStorage.removeItem(category);
        });
        localStorage.removeItem("order");

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.phoneContainer}>
        <Header />
        <Order order={order} setOrder={updateOrder} />
        <span
          className={styles.cookingInstructions}
          onClick={() => {
            setIsInstructionsSelected(true);
          }}
        >
          Add cooking instructions (optional)
        </span>
        {isInstructionsSelected && (
          <div className={styles.instructionsContainer}>
            <div className={styles.blur}></div>
            <div className={styles.instructions}>
              <div className={styles.closeButton}>
                <button
                  type="button"
                  onClick={() => {
                    setIsInstructionsSelected(false);
                    setInstructions("");
                  }}
                >
                  X
                </button>
              </div>
              <div className={styles.instructionsBox}>
                <p className={styles.instructionsTitle}>
                  Add Cooking Instructions
                </p>
                <div className={styles.instructionsInput}>
                  <textarea
                    onChange={(e) => {
                      setInstructions(e.target.value);
                      setCompleteOrder({
                        ...completeOrder,
                        cookingInstructions: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <p className={styles.disclaimer}>
                  The restaurant will try its best to follow your request.
                  However, refunds or cancellations in this regard won’t be
                  possible
                </p>
                <div className={styles.buttonsBox}>
                  <div className={styles.cancelDiv}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsInstructionsSelected(false);
                        setInstructions("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className={styles.nextDiv}>
                    <button
                      type="button"
                      className={styles.nextButton}
                      onClick={() => {
                        setIsInstructionsSelected(false);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.dineInTakeout}>
          <p
            style={{
              backgroundColor:
                typeOfOrder === "Dine in" ? "white" : "transparent",
            }}
            onClick={() => {
              setTypeOfOrder("Dine in");
            }}
          >
            Dine in
          </p>
          <p
            style={{
              backgroundColor:
                typeOfOrder === "Take Away" ? "white" : "transparent",
            }}
            onClick={() => {
              setTypeOfOrder("Take Away");
            }}
          >
            Take Away
          </p>
        </div>
      </div>
      <Bill
        typeOfOrder={typeOfOrder}
        delivTime={delTime}
        setUserName={updateUserName}
        setUserPhone={updateUserPhone}
        setUserAddress={updateUserAddress}
        setDelTime={updateDelTime}
        order={order}
        totalCost={totalCost}
        setTotalCost={updateTotalCost}
        deliveryCharge={deliveryCharge}
        setDeliveryCharge={updateDeliveryCharge}
        taxes={taxes}
        setTaxes={updateTaxes}
      />
      <Swipe
        name={userName}
        phone={userPhone}
        address={userAddress}
        orderType={typeOfOrder}
        placeOrder={placeOrder}
      />
    </>
  );
};

export default ConfirmOrder;
