import axios from "axios";

const axiosInstance = axios.create();

export const get = (url, config) => {
  return axiosInstance.get(url, config);
};

export const post = (url, data, config) => {
  return axiosInstance.post(url, data, config);
};

export const put = (url, data, config) => {
  return axiosInstance.put(url, data, config);
};

export const patch = (url, data, config) => {
  return axiosInstance.patch(url, data, config);
};

export const patch_no_data = (url, config) => {
  return axiosInstance.patch(url, {}, config);
};

export const delete_request = (url, config) => {
  return axiosInstance.delete(url, config);
};
