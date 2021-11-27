//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "http://backend-shop.test/api",
  // baseURL: "http://127.0.0.1:8000/api",
});

export default Api;
