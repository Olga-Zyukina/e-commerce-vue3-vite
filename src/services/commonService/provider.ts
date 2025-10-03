import { ref } from "vue";
import axios from "axios";
import { URL_ALL_PRODUCTS } from "../../constants/api";

const error: any = ref(null);

export const getNews = async () => {
  try {
    const data = await axios.get(URL_ALL_PRODUCTS);
    return data?.data.Data;
  } catch (e) {
    console.error("API Error:", e);
    if (axios.isAxiosError(e)) {
      if (!e.response) {
        error.value['news'] = "Unable to connect to the server. Please try again later";
      } else {
        error.value['news'] = "An error occurred while fetching data. Please try again";
      }
    } else {
      error.value['news'] = "An unexpected error occurred. Please try again";
    }
    return error.value;
  }
};

