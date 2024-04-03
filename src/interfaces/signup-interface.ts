export interface ICountry {
    id: number;
    pid: number | null;
    name: string;
    createdAt: string;
}

export interface ICity {
    id: number;
    pid: number;
    name: string;
    createdAt: string;
}

export interface IGetResponse {
    setCountries: ICountry[];
    setCities: ICity[];
    selectedCountry: string;
}

export interface ISignupApi {
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    gender: string;
    region: string;
    state: string;
}