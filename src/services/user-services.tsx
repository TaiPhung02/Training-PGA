import { AxiosRequestConfig } from "axios";
import { pgApi } from "./customize-axios";
import { ISignupApi } from "../interfaces/signup-interface";
import {
    IAddProductApi,
    IEditProductApi,
} from "../interfaces/productApi-interface";

export const loginPGApi = (email: string, password: string) => {
    return pgApi.post("auth/login", { email, password });
};

export const signupPGApi = ({
    email,
    password,
    repeatPassword,
    name,
    gender,
    region,
    state,
}: ISignupApi) => {
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

export const addProductApi = ({
    status,
    currency,
    fundingMethod,
    total,
    order,
    client,
    invoice,
}: IAddProductApi) => {
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

export const editProductApi = ({
    id,
    status,
    currency,
    fundingMethod,
    total,
    order,
    client,
    invoice,
}: IEditProductApi) => {
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

export const updateUser = async (data: any): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: `http://api.training.div3.pgtest.co/api/v1/user`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    const response = await pgApi(config);
    return response;
};
