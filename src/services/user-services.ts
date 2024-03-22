import * as axios from "axios";
import axios from "./customize-axios";
import location from "./customize-axios";

const loginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
};

export { loginApi };
