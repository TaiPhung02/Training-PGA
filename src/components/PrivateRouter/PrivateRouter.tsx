import { Navigate } from "react-router-dom";

export default function PrivateRouter(props) {
    const data = localStorage.getItem("token");

    return data ? props.children : <Navigate to="/login"></Navigate>;
}
