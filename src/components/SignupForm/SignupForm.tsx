import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupApi } from "../../services/user-services";
import { countryApi, cityApi } from "../../services/user-services";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signupValidation } from "../../utils/validate-utils";
import {
    ICountry,
    ICity,
    IGetResponse,
} from "../../interfaces/signup-interface";
import "./signupForm.css";

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    selectedGender: "",
    selectedCountry: "",
    selectedCity: "",
};

const fetchData = async (setCountries, setCities, selectedCountry) => {
    try {
        const countriesRes = await countryApi();
        setCountries(countriesRes.data.data);

        if (selectedCountry) {
            const citiesRes = await cityApi(selectedCountry);
            setCities(citiesRes.data.data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const SignupForm = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const navigate = useNavigate();
    const [isNav, setIsNav] = useState(false);

    const [loadingIcon, setLoadingIcon] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signupValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    useEffect(() => {
        fetchData(setCountries, setCities, selectedCountry);
    }, [selectedCountry]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        formik.setFieldValue("selectedCountry", selectedCountry);
        setSelectedCountry(selectedCountry);
    };

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        formik.setFieldValue("selectedCity", selectedCity);
        setSelectedCity(selectedCity);
    };

    const handleSignup = async () => {
        setLoadingIcon(true);

        const res = await SignupApi(
            formik.values.email,
            formik.values.password,
            formik.values.confirmPassword,
            formik.values.userName,
            formik.values.selectedGender,
            formik.values.selectedCountry,
            formik.values.selectedCity
        );
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            console.log("Token: ", res.token);
            setIsNav(true);
            toast.success("Signup in successfully");
            navigate("/login");
        } else {
            if (res && res.status === 400) {
                console.log(res);
                toast.error(res.data.error);
            }
        }

        setLoadingIcon(false);
    };

    return (
        <>
            {isNav && <Navigate to="/login"></Navigate>}

            <div className="sign-up-wrapper">
                <form
                    action=""
                    noValidate
                    className="sign-up-form"
                    onSubmit={formik.handleSubmit}
                >
                    <h1 className="sign-up__heading">Sign Up</h1>
                    <div className="sign-up__input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="sign-up__input"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.email && (
                        <p className="sign-up__message-error">
                            {formik.errors.email}
                        </p>
                    )}
                    <div className="sign-up__input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="on"
                            className="sign-up__input"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.password && (
                        <p className="sign-up__message-error">
                            {formik.errors.password}
                        </p>
                    )}
                    <div className="sign-up__input-box">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="on"
                            className="sign-up__input"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.confirmPassword && (
                        <p className="sign-up__message-error">
                            {formik.errors.confirmPassword}
                        </p>
                    )}
                    <div className="sign-up__input-box">
                        <input
                            type="text"
                            name="userName"
                            placeholder="UserName"
                            className="sign-up__input"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.userName && (
                        <p className="sign-up__message-error">
                            {formik.errors.userName}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select
                            name="selectedGender"
                            className="sign-up__select-box"
                            value={formik.values.selectedGender}
                            onChange={formik.handleChange}
                        >
                            <option value="" disabled hidden>
                                -- Select Gender --
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    {formik.errors.selectedGender && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectedGender}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select
                            name="selectedCountry"
                            className="sign-up__select-box"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            <option value="" disabled hidden>
                                -- Select Country --
                            </option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.selectedCountry && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectedCountry}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select
                            name="selectedCity"
                            className="sign-up__select-box"
                            value={selectedCity}
                            onChange={handleCityChange}
                        >
                            <option value="" disabled hidden>
                                -- Select City --
                            </option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.selectedCity && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectedCity}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="sign-up__btn sign-up-active"
                        onClick={() => {
                            handleSignup();
                        }}
                    >
                        {loadingIcon && (
                            <AiOutlineLoading3Quarters className="loaderIcon" />
                        )}
                        Sign Up
                    </button>
                    <div className="sign-up__register-link">
                        <p className="sign-up__desc">
                            Already have an account?{" "}
                            <Link to={"/login"} className="sign-up__register">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignupForm;
