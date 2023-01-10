import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { OrderListContext, OrdersListContextProps } from '../../../../../contexts/orders';
import OrderCard from '../OrderCard';

// import { Container } from './styles';

const OrderGrid: React.FC = () => {

    const { orders } = useContext<OrdersListContextProps>(OrderListContext);

    return <SimpleGrid columns={[2, 2, 2, 2]} spacing={10}>
        {orders.map(order => (
            <Box key={order.id}><OrderCard order={order} /></Box>
        ))}
    </SimpleGrid>;
}

export default OrderGrid;