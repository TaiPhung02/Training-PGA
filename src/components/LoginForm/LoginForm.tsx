import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, loginPGApi } from "../../services/user-services";
import { toast } from "react-toastify";
import "./loginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { loginValidation } from "../../utils/validate-utils";

import { useDispatch } from "react-redux";
import {
    loginStart,
    loginSuccess,
    loginFail,
} from "../../redux/auth/authSlice";

const initialValues = {
    email: "",
    password: "",
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loadingIcon, setLoadingIcon] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: loginValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    const handleLogin = async () => {
        dispatch(loginStart());

        try {
            setLoadingIcon(true);
            const res = await loginPGApi(
                formik.values.email,
                formik.values.password
            );

            if (res && res.data && res.data.token) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.name);
                dispatch(loginSuccess(res.data));
                toast.success("Logged in successfully");
                navigate("/");
            } else {
                dispatch(loginFail("Login failed"));
                toast.error("Login failed");
            }

            setLoadingIcon(false);
        } catch (error) {
            console.error("An error occurred during login: ", error);
            toast.error("An error occurred during login");
            dispatch(loginFail("Login failed"));
            setLoadingIcon(false);
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        formik.setFieldValue("email", email);
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        formik.setFieldValue("password", password);
    };

    return (
        <>
            <div className="login-wrapper">
                <form
                    onSubmit={formik.handleSubmit}
                    action=""
                    noValidate
                    className="login-form"
                >
                    <h1 className="login__heading">Login</h1>
                    <div className="login__input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="login__input"
                            value={formik.values.email}
                            onChange={handleEmailChange}
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
                            value={formik.values.password}
                            onChange={handlePasswordChange}
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
                            formik.values.email && formik.values.password
                                ? "login__btn login-active"
                                : "login__btn"
                        }
                        disabled={
                            formik.values.email &&
                            formik.values.password &&
                            formik.isValid
                                ? false
                                : true
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
