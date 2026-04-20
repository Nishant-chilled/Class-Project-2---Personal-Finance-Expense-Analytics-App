import axios from 'axios';

export async function fetchExchangeRates(base = 'INR') {
  const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
  return response.data;
}
