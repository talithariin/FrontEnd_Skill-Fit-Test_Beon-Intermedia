import axios from "axios";
import {
  get,
  post,
  put,
  patch,
  patch_no_data,
  delete_request,
} from "../utils/HttpRequest";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

/* ========================================================= Resident ========================================================= */
export const getAllResident = async () => {
  const url = `${API_URL}/resident`;
  return await get(url);
};

export const addResident = async (data) => {
  const url = `${API_URL}/resident`;
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  });

  return await post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editResident = async (id, data) => {
  const url = `${API_URL}/resident/${id}`;
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  });

  return await put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteResident = async (id) => {
  const url = `${API_URL}/resident/${id}`;
  return await delete_request(url);
};

/* ========================================================= House ========================================================= */
export const getAllHouse = async () => {
  const url = `${API_URL}/house`;
  return await get(url);
};

export const addHouse = async (data) => {
  const url = `${API_URL}/house`;
  return await post(url, data);
};

export const editHouse = async (id, data) => {
  const url = `${API_URL}/house/${id}`;
  return await put(url, data);
};

/* ========================================================= House Resident ========================================================= */
export const getAllHouseResident = async () => {
  const url = `${API_URL}/house-resident`;
  return await get(url);
};

export const getHouseResidentByHouseId = async (houseId) => {
  const url = `${API_URL}/house-resident/${houseId}`;
  return await get(url);
};

export const addHouseResident = async (data) => {
  const url = `${API_URL}/house-resident`;
  return await post(url, data);
};

export const editHouseResident = async (id, data) => {
  const url = `${API_URL}/house-resident/${id}`;
  return await put(url, data);
};

/* ========================================================= Fee Type ========================================================= */
export const getAllFeeType = async () => {
  const url = `${API_URL}/fee`;
  return await get(url);
};

export const editFeeType = async (id, data) => {
  const url = `${API_URL}/fee/${id}`;
  return await put(url, data);
};

export const addFeeType = async (data) => {
  const url = `${API_URL}/fee`;
  return await post(url, data);
};

/* ========================================================= Payment ========================================================= */
export const getAllPayment = async () => {
  const url = `${API_URL}/payment`;
  return await get(url);
};

export const addPayment = async (data) => {
  const url = `${API_URL}/payment`;
  return await post(url, data);
};

export const editPayment = async (id, data) => {
  const url = `${API_URL}/payment/${id}`;
  return await put(url, data);
};

/* ========================================================= Income ========================================================= */
export const getAllIncome = async () => {
  const url = `${API_URL}/income`;
  return await get(url);
};

export const getMonthlyIncome = async (month, year) => {
  const url = `${API_URL}/income/monthly/${month}/${year}`;
  return await get(url);
};
