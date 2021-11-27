import Api from "../../api/Api";
import axios from "axios";
//get data token dan user
const token = localStorage.getItem("token");

//set axios header dengan type Authorization + Bearer token
Api.defaults.headers.common["Authorization"] = "Bearer " + token;

const instance = axios.create({
  baseURL: "https://demo-api.com",
  headers: { "Ocp-Apim-Subscription-Key": "API KEY" }, //don't forget to change API key to your exact key
});

export default instance;
