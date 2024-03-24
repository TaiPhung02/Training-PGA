import { instance, location } from "./customize-axios";

const loginApi = (email, password) => {
    return instance.post("login", { email, password });
};

const SignupApi = (
    email,
    password,
    confirmPassword,
    userName,
    selectedGender,
    selectedCountry,
    selectedCity
) => {
    return instance.post("register", {
        email,
        password,
        confirmPassword,
        userName,
        selectedGender,
        selectedCountry,
        selectedCity,
    });
};

const countryApi = () => {
    return location.get("location");
};

const cityApi = (selectedCountry) => {
    return location.get(`location?pid=${selectedCountry}`);
};

export { loginApi, SignupApi, countryApi, cityApi };
