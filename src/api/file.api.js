import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/files`;

export const fetchFolders = () =>
  axios.get(`${API}/folders`);

export const fetchFiles = owner =>
  axios.get(`${API}/${owner}`);

export const uploadFile = data =>
  axios.post(`${API}/upload`, data);
