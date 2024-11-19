import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // URL бэкенда
});

export default API;
