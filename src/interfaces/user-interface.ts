export interface IUserProfile {
    id?: number;
    name?: string;
    email?: string;
    gender?: string;
    avatar?: string;
    region?: string;
    state?: string;
    description: string | null;
    createdAt?: string;
    updateAt?: string;
    token?: string;
}
