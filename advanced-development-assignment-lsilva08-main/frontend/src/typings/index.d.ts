export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    profile: string;
}

export type Order = {
    id: number;
    customer: number, //User
    items: [
        { id: number, quantity: number, product: Product }
    ]
    value: number;
    trackingCode: string;
    createdAt: string;
}

export type OrderTracking = {
    id: string;
    positions: [
        { address: string, latitude: number, longitude: number }
    ]
}

export type Tracking = {
    address: string;
    latitude: number;
    longitude: number;
}