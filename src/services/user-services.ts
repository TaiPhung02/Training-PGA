import axios from "axios";
import axios from "./customize-axios";
import { FormData } from "../interfaces/login-interface";

const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

export { loginApi };
