import { pgApi } from "./customize-axios";

export const loginPGApi = (email, password) => {
    return pgApi.post("auth/login", { email, password });
};

export const singupPGApi = (
    email,
    password,
    repeatPassword,
    name,
    gender,
    region,
    state
) => {
    return pgApi.post("auth/register", {
        email,
        password,
        repeatPassword,
        name,
        gender,
        region,
        state,
    });
};

export const countryApi = () => {
    return pgApi.get("location");
};

export const cityApi = (selectedCountry: string) => {
    return pgApi.get(`location?pid=${selectedCountry}`);
};

export const getProductApi = () => {
    return pgApi.get("product");
};

export const addProductApi = (
    status,
    currency,
    fundingMethod,
    total,
    order,
    client,
    invoice
) => {
    return pgApi.post("product", {
        status,
        currency,
        fundingMethod,
        total,
        order,
        client,
        invoice,
    });
};

export const editProductApi = (
    id,
    status,
    currency,
    fundingMethod,
    total,
    order,
    client,
    invoice
) => {
    return pgApi.put("product", {
        id,
        status,
        currency,
        fundingMethod,
        total,
        order,
        client,
        invoice,
    });
};

export const deleteProductApi = (productId: number) => {
    return pgApi.delete(`product/${productId}`);
};

export const searchProductApi = (productId: number) => {
    return pgApi.get(`product/${productId}`);
};

export const userApi = () => {
    return pgApi.get("user");
};
