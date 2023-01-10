import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { OrderListContext, OrdersListContextProps } from '../../../../../contexts/orders';


const OrderFilter: React.FC = () => {

    const [filter, setFilter] = useState<string>('');
    const { filterOrders } = useContext<OrdersListContextProps>(OrderListContext);

    const applyFilter = () => filterOrders(filter);

    return <InputGroup size='md'>
        <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            pr='4.5rem'
            type={'text'}
            placeholder='Search for an order'
        />
        <InputRightElement width='4.5rem'>
            <Button onClick={applyFilter} h='1.75rem' size='sm'>
                Search
            </Button>
        </InputRightElement>
    </InputGroup>;
}

export default OrderFilter;