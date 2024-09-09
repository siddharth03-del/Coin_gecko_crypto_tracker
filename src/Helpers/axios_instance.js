import axios from "axios";
const axios_instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
})
export default axios_instance;