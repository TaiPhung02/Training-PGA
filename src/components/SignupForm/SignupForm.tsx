import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { singupPGApi, countryApi, cityApi } from "../../services/user-services";

import { useFormik } from "formik";
import { signupValidation } from "../../utils/validate-utils";

import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import "./signupForm.css";

const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    gender: "",
    region: "",
    state: "",
};

const fetchData = async (setCountries, setCities, selectedCountry) => {
    try {
        const countriesRes = await countryApi();
        setCountries(countriesRes.data);

        if (selectedCountry) {
            const citiesRes = await cityApi(selectedCountry);
            setCities(citiesRes.data);
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
        setSelectedCountry(selectedCountry);
        formik.setFieldValue("region", selectedCountry);
    };

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        setSelectedCity(selectedCity);
        formik.setFieldValue("state", selectedCity);
    };

    const handleSignup = async () => {
        setLoadingIcon(true);

        const res = await singupPGApi(
            formik.values.email,
            formik.values.password,
            formik.values.repeatPassword,
            formik.values.name,
            formik.values.gender,
            formik.values.region,
            formik.values.state
        );

        console.log("res:", res);

        if (res && res.data && res.data.token) {
            toast.success("Signup in successfully");
            navigate("/login");
        } else {
            if (res && res.status === 500) {
                console.log(res);
                toast.error(res.data.message);
            } else if (res && res.status === 400) {
                toast.error(
                    "Registration is invalid, please check your registration information again"
                );
            } else {
                toast.error("An error occurred, please try again later");
            }
        }

        setLoadingIcon(false);
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
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
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
                    {formik.touched.password && formik.errors.password && (
                        <p className="sign-up__message-error">
                            {formik.errors.password}
                        </p>
                    )}
                    <div className="sign-up__input-box">
                        <input
                            type="password"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            autoComplete="on"
                            className="sign-up__input"
                            value={formik.values.repeatPassword}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.repeatPassword &&
                        formik.errors.repeatPassword && (
                            <p className="sign-up__message-error">
                                {formik.errors.repeatPassword}
                            </p>
                        )}
                    <div className="sign-up__input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="sign-up__input"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                        <p className="sign-up__message-error">
                            {formik.errors.name}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select
                            name="gender"
                            className="sign-up__select-box"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <option value="" disabled hidden>
                                -- Select Gender --
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="sign-up__message-error">
                            {formik.errors.gender}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        {countries && countries.length > 0 && (
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
                        )}
                    </div>
                    {formik.touched.region && formik.errors.region && (
                        <p className="sign-up__message-error">
                            {formik.errors.region}
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
                    {formik.touched.state && formik.errors.state && (
                        <p className="sign-up__message-error">
                            {formik.errors.state}
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
