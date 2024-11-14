import axios from "axios";

const axiosConfig = {
    baseURL: "http://localhost:3000"
}

const api = axios.create(axiosConfig)

export { api } 
