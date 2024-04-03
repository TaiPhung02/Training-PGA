export interface IProduct {
    id: number;
    status: string;
    currency: string;
    fundingMethod: string;
    total: number;
    order: string;
    client: string;
    invoice: string;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
}

export interface IKeyProduct {
    key: number;
    id: number;
    status: string;
    currency: string;
    fundingMethod: string;
    total: number;
    order: string;
    client: string;
    invoice: string;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
}

export interface IFilterParams {
    status?: string;
    client?: string;
    dateRange?: [string, string];
    invoice?: string;
}

export interface IDataType {
    key: number;
    id: number;
    status: string;
    currency: string;
    fundingMethod: string;
    total: number;
    order: string;
    client: string;
    invoice: string;
    createdBy: number;
    createdAt: string;
    updatedAt: string;
}
