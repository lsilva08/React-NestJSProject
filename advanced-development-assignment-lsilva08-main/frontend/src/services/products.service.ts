import { Product } from "../typings"
import api from "./api"

export const findProducts = async (): Promise<Product[]> => {
    return (await api.get('/products')).data
}

export const findProductById = async (productId: number): Promise<Product> => {
    return (await api.get(`/products/${productId}`)).data;
}

export const buyProduct = async (userId: string, productId: number, quantity: number): Promise<boolean> => {
    return api.post(`/orders`, {
        customer: userId,
        products: [{ id: productId, quantity }]
    })
}

export const upsertProduct = async (name: string, price: number, description: string, id?: number): Promise<Product | undefined> => {
    return id
        ? (await api.put(`/products/${id}`, { name, description, price })).data
        : (await api.post('/products', { name, description, price })).data;
}