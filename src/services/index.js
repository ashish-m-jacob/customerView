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
