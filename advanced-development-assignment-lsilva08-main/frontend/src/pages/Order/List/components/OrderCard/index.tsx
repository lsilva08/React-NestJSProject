import { Box, Button, Divider, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';
import { Order } from '../../../../../typings';

export interface OrderCardParams {
    order: Order;
}

const OrderCard: React.FC<OrderCardParams> = ({ order }) => {

    const navigate = useNavigate();

    return <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold">Order nº</Text><Text fontWeight="bold">{order.id}</Text>
            <Text fontWeight="hairline">{order.createdAt}</Text>
        </Stack>
        <Stack
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between">
            <VStack mr="20" spacing={0}>
                <Text w="full" textAlign={'left'} maxW={'4xl'}>
                    Value: {order.value}
                </Text>
            </VStack>
            <Button onClick={() => { navigate(`/orders/${order.id}`) }} colorScheme="blue">View</Button>
        </Stack>
        <Divider />
        <Box>
            <Text fontWeight="semibold">Products</Text>
            {order.items.map(({ product, quantity }) => (
                <div key={product.id}>
                    <Box display="flex" alignItems="center">
                        {quantity}x <Text ml="2" mr="2" fontWeight="bold">{product.name}</Text>
                        <Text textAlign="right" w="full" >${product.price * quantity}</Text>
                    </Box>
                    <Divider />
                </div>
            ))}
        </Box>
    </Stack>;
}

export default OrderCard;