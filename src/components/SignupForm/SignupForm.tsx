import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useFormik } from "formik";

import { signupValidation } from "../../utils/validate-utils";
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

const SignupForm = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [userName, setUserName] = useState("");

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signupValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    console.log(formik.errors);

    const fetchData = async () => {
        await axios
            .get("http://api.training.div3.pgtest.co/api/v1/location")
            .then((res) => {
                setCountries(res.data.data);
            })
            .catch((err) => {
                console.error("Error fetching countries:", err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            axios
                .get(
                    `http://api.training.div3.pgtest.co/api/v1/location?pid=${selectedCountry}`
                )
                .then((response) => {
                    setCities(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching cities:", error);
                });
        }
    }, [selectedCountry]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <>
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
                            required
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
                            required
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
                            required
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
                            required
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
                            name="selectGender"
                            className="sign-up__select-box"
                            // value={formik.values.selectGender}
                            defaultValue="0"
                        >
                            <option value="0" disabled hidden>
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
                            // defaultValue="0"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                        >
                            <option value="0" disabled hidden>
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
                            // defaultValue="0"
                            value={selectedCity}
                            onChange={handleCityChange}
                        >
                            <option value="0" disabled hidden>
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
                    >
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
