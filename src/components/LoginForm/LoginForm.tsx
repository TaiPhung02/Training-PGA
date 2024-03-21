import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginApi } from "../../services/user-services";
import { toast } from "react-toastify";
import "./loginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { loginValidation } from "../../utils/validate-utils";

const initialValues = {
    email: "",
    password: "",
};

const LoginForm = () => {
    const navigate = useNavigate();

    const [isNav, setIsNav] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingIcon, setLoadingIcon] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required");
            return;
        }

        setLoadingIcon(true);

        const res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            console.log("Token: ", res.token);
            setIsNav(true);
            toast.success("Logged in successfully");
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }

        setLoadingIcon(false);
    };

    return (
        <>
            {isNav && <Navigate to="/"></Navigate>}

            <div className="login-wrapper">
                <form
                    onSubmit={formik.handleSubmit}
                    action=""
                    noValidate
                    className="login-form"
                >
                    <h1 className="login__heading">Login</h1>
                    <span>(eve.holt@reqres.in)</span>
                    <div className="login__input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="login__input"
                            required
                            value={formik.values.email}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setEmail(e.target.value);
                            }}
                        />
                        <FaUser className="login__input-icon" />
                    </div>
                    {formik.errors.email && (
                        <p className="login__message-error">
                            {formik.errors.email}
                        </p>
                    )}
                    <div className="login__input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="on"
                            className="login__input"
                            required
                            value={formik.values.password}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setPassword(e.target.value);
                            }}
                        />
                        <FaLock className="login__input-icon" />
                    </div>
                    {formik.errors.password && (
                        <p className="login__message-error">
                            {formik.errors.password}
                        </p>
                    )}
                    <div className="login__remember-forgot">
                        <label className="login__remember">
                            <input
                                type="checkbox"
                                name="remember"
                                className="login__checkbox"
                            />
                            Remember me
                        </label>
                        <a href="#!" className="login__forgot">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className={
                            email && password
                                ? "login__btn login-active"
                                : "login__btn"
                        }
                        disabled={
                            email && password && formik.isValid ? false : true
                        }
                        onClick={() => {
                            handleLogin();
                        }}
                    >
                        {loadingIcon && (
                            <AiOutlineLoading3Quarters className="loaderIcon" />
                        )}
                        Login
                    </button>
                    <div className="login__register-link">
                        <p className="login__desc">
                            Don't have an account?{" "}
                            <Link to={"/sign-up"} className="login__register">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
