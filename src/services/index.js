const URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchFoodData(selectedCategory) {
  try {
    const res = await fetch(`${URL}/food?category=${selectedCategory}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (err) {
    console.log(`Error fetching food data:`);
    throw err;
  }
}

export async function sendOrder(
  name,
  phone,
  address,
  orderItems,
  orderQuantity,
  itemTotal,
  deliveryCharge,
  taxes,
  cookingInstructions,
  orderType
) {
  try {
    const res = await fetch(`${URL}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        orderItems,
        orderQuantity,
        itemTotal,
        deliveryCharge,
        taxes,
        cookingInstructions,
        orderType,
      }),
    });

    const data = await res.json();
    const status = res.status;

    console.log(status);
    return { data, status };
  } catch (err) {
    console.log(`Error placing order ${err}`);
    throw err;
  }
}
