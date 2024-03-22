import * as Yup from "yup";

export const loginValidation = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email address"
        ),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Minimum eight characters, at least one letter, one number and one special character"
        ),
    toggle: Yup.bool().oneOf(
        [true],
        "You need to accept the terms and conditions"
    ),
});

export const signupValidation = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please enter a valid email address"
        ),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Minimum eight characters, at least one letter, one number and one special character"
        ),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    userName: Yup.string()
        .required("Username is required")
        .min(4, "Must be 4 characters or more"),
    selectedGender: Yup.string().required("Gender is required"),
    selectedCountry: Yup.string().required("Country is required"),
    selectedCity: Yup.string().required("City is required"),
});
