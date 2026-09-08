import axios from "axios";

let cachedRate = null;
let cacheTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getUsdToKesRate = async () => {
  const now = Date.now();
  if (cachedRate && now - cacheTime < CACHE_DURATION) {
    return cachedRate;
  }

  const { data } = await axios.get("https://open.er-api.com/v6/latest/USD");
  cachedRate = data.rates.KES;
  cacheTime = now;
  return cachedRate;
};

export const kshToUsd = (kshAmount, rate) => {
  return (kshAmount / rate).toFixed(2);
};
