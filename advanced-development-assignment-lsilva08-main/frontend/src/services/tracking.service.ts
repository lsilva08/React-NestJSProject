import { OrderTracking } from "../typings";
import api from "./api";

export const findTracking = async (orderId: number): Promise<OrderTracking> => {
    return (await api.get(`/orders/${orderId}/tracking`)).data
}

export const createNewPosition = async (orderId: number, address: string, latitude: number, longitude: number): Promise<OrderTracking> => {
    return (await api.post(`/orders/${orderId}/tracking`, { address, latitude, longitude })).data;
}