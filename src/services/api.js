import axios from "axios";

const api = axios.create({
  baseURL: "https://paperbro-back.onrender.com/api",
});

export default api;