export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    wishlist: [];
    addresses: [];
    createdAt: string;
    updatedAt: string;
}
