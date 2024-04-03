import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
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

export const signupValidation = Yup.object().shape({
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
    repeatPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    name: Yup.string()
        .required("Username is required")
        .min(4, "Must be 4 characters or more"),
    gender: Yup.string().required("Gender is required"),
    region: Yup.string().required("Country is required"),
    state: Yup.string().required("City is required"),
});

export const addProductValidation = Yup.object().shape({
    status: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    fundingMethod: Yup.string().required("Required"),
    total: Yup.number().required("Required"),
    order: Yup.string().required("Required"),
    client: Yup.string().required("Required"),
    invoice: Yup.string().required("Required"),
});

export const editProductValidation = Yup.object().shape({
    status: Yup.string().required("Required"),
    currency: Yup.string().required("Required"),
    fundingMethod: Yup.string().required("Required"),
    total: Yup.number().required("Required"),
    order: Yup.string().required("Required"),
    client: Yup.string().required("Required"),
    invoice: Yup.string().required("Required"),
});
