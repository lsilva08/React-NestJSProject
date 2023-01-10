import { Box, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { OrderListContext, OrdersListContextProps } from '../../../contexts/orders';

import OrderFilter from './components/OrderFilter';
import OrderGrid from './components/OrderGrid';

const OrderList: React.FC = () => {

    const { loadOrders } = useContext<OrdersListContextProps>(OrderListContext);

    useEffect(() => {
        loadOrders();
        return () => { }
    }, [])

    return <VStack spacing={30}>
        <Box w="full">
            <OrderFilter />
        </Box>
        <Box>
            <OrderGrid />
        </Box>
    </VStack>;
}

export default OrderList;