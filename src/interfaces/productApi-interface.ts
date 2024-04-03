export interface IAddProductApi {
    status: string;
    currency: string;
    fundingMethod: string;
    total: number;
    order: string;
    client: string;
    invoice: string;
}

export interface IEditProductApi {
    id: number;
    status: string;
    currency: string;
    fundingMethod: string;
    total: number;
    order: string;
    client: string;
    invoice: string;
}
