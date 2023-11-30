// StockService.jsx
import axios from "axios";

const fetchCurrentPriceData = async (symbol) => {
  try {
    const response = await axios.get(
      `https://realtick.pythonanywhere.com/currentprice?symbol=${symbol}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default fetchCurrentPriceData;