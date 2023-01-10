import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Box, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import Loader from '../../../../components/Loader';
import NotFound from '../../../../components/NotFound';
import { AuthenticationContext, AuthenticationContextProps } from '../../../../contexts/authentication';
import { OrderDetailsContext, OrderDetailsContextProps } from '../../../../contexts/orders/details';
import UpsertDialog from '../components/UpsertDialog';
import Maps from '../components/Maps';

const UserOrderDetails: React.FC = () => {

    let { orderId } = useParams();
    const {
        order, orderTracking, loadOrder, loadingOrder, loadedOrder,
        isOpen, onOpen, onClose
    } = useContext<OrderDetailsContextProps>(OrderDetailsContext);
    const { profile } = useContext<AuthenticationContextProps>(AuthenticationContext);

    useEffect(() => {
        loadOrder(Number(orderId));
        return () => { }
    }, [orderId])

    const Screen = (
        <>
            <SimpleGrid columns={[1, 1, 1, 3]} spacing={10}>
                <GridItem colSpan={1}>
                    <VStack spacing={5}>
                        <Box>
                            <Image
                                w={300}
                                src={`https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`}
                                roundedTop="lg"
                            />
                        </Box>
                        <Box textAlign={"center"}>
                            <Text>
                                Customer
                            </Text>
                            <Text>
                                {order?.customer}
                            </Text>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} w="full" borderWidth='1px' padding={5} borderRadius='lg' >
                            {order?.items?.map(item => (
                                <Text key={item.id.toString().concat(item.product.name)}>
                                    {item.quantity}x - {item.product.name}
                                </Text>
                            ))}
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem colSpan={2}>
                    <VStack spacing={10}>
                        <Box borderWidth='1px' padding={5} borderRadius='lg' w="full" textAlign={"center"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                            <Text fontSize={"2xl"}>Tracking nº</Text>
                            <Text ml="2" fontSize={"2xl"} fontWeight={"bold"}>{order?.trackingCode}</Text>
                        </Box>
                        <Box borderWidth='1px' padding={5} borderRadius='lg' w="full" textAlign={"center"}>
                            <Text mb={10} fontSize={"xl"}>Tracking details</Text>
                            {orderTracking?.positions?.map((position, index: number) => (
                                <Box key={index} w="full" textAlign={"center"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"}>
                                    <Text fontWeight={"bold"} fontSize={"md"}>{index + 1} -</Text>
                                    <Text ml="2" fontSize={"md"}>{position.address}</Text>
                                </Box>
                            ))}
                            {profile === 'admin' && (
                                <Button mt={10} colorScheme={"blue"} onClick={onOpen}>New tracking position</Button>
                            )}
                        </Box>
                        <Box borderWidth='1px' padding={5} borderRadius='lg' w="full" textAlign={"center"}>
                            <Maps />
                        </Box>
                    </VStack>
                </GridItem>
            </SimpleGrid >
            <UpsertDialog />
        </>
    );

    const renderedComponent = useMemo(() => {
        if (!order && loadingOrder) {
            return <Loader />;
        }
        if (loadedOrder && order) {
            return Screen;
        }
        return <NotFound description='The order that you searched for was not found' />
    }, [loadedOrder, order, loadingOrder])


    return renderedComponent;
}

export default UserOrderDetails;