import { Link } from "react-router-dom";

import { useFormik } from "formik";

import "./signupForm.css";
import { signupValidation } from "../../utils/validate-utils";

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    selectField: "",
};

const SignupForm = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [userName, setUserName] = useState("");

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signupValidation,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    });

    console.log(formik.errors);

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
                            name="username"
                            placeholder="Username"
                            className="sign-up__input"
                            required
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.username && (
                        <p className="sign-up__message-error">
                            {formik.errors.username}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select name="sex" className="sign-up__select-box">
                            <option value="" selected disabled hidden>
                                -- Select Gender --
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    {formik.errors.selectField && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectField}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select name="country" className="sign-up__select-box">
                            <option value="" selected disabled hidden>
                                -- Select Country --
                            </option>
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                        </select>
                    </div>
                    {formik.errors.selectField && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectField}
                        </p>
                    )}
                    <div className="sign-up__input-box custom-select">
                        <select name="city" className="sign-up__select-box">
                            <option value="" selected disabled hidden>
                                -- Select City --
                            </option>
                            <option value="apple">Apple</option>
                            <option value="banana">Banana</option>
                            <option value="orange">Orange</option>
                        </select>
                    </div>
                    {formik.errors.selectField && (
                        <p className="sign-up__message-error">
                            {formik.errors.selectField}
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
