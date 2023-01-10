import React, { createContext, useContext, useMemo, useState } from "react";
import { findOrders } from "../../services/orders.service";
import { Order } from "../../typings";
import { AuthenticationContext, AuthenticationContextProps } from "../authentication";

export interface OrdersListContextProps {
    orders: Order[];
    loadingOrders: boolean;
    loadOrders: () => Promise<void>;
    filterOrders: (filter: string) => void;
}

export const OrderListContext = createContext<OrdersListContextProps>({
    orders: [],
    loadingOrders: false,
    loadOrders: async () => { },
    filterOrders: () => { }
});

const OrderListContextProvider: React.FC = ({ children }) => {

    const { user } = useContext<AuthenticationContextProps>(AuthenticationContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    const loadOrders = async () => {
        setLoadingOrders(true);
        try {
            const foundOrders = await findOrders(user?.id || '');
            setOrders(foundOrders);
        } catch (err) {
            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    }

    const filteredOrders = useMemo(
        () => orders
            .filter(order => order.items.some(item => filter ? item.product.name.includes(filter) : true)
            ),
        [filter, orders]
    )

    const filterOrders = (filter: string) => setFilter(filter);

    return <OrderListContext.Provider value={{
        orders: filteredOrders,
        loadingOrders,
        loadOrders,
        filterOrders
    }}>
        {children}
    </OrderListContext.Provider>;
}

export default OrderListContextProvider;