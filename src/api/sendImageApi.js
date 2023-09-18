import axios from "axios";
import { API_URL } from "../config";
export async function sendImages(formData) {
  try {
    // const formData = new FormData();
    // for (let i = 0; i < imageFiles.length; i++) {
    //   formData.append(`image${i}`, imageFiles[i]);
    // }
    const response = await axios.post(`${API_URL}predict`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
