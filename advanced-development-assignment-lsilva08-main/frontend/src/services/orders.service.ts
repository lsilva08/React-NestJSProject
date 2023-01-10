import { Order } from "../typings"
import api from "./api"

export const findOrders = async (userId: string): Promise<Order[]> => {
    return (await api.get('/orders', { headers: { Authorization: userId } })).data
}

export const findOrderById = async (orderId: number, userId: string): Promise<Order> => {
    return (await api.get(`/orders/${orderId}`, { headers: { Authorization: userId } })).data
}