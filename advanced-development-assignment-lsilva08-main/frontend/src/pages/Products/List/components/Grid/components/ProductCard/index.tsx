import React from 'react';
import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Icon,
    chakra,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Product } from '../../../../../../../typings';
import { useNavigate } from 'react-router';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const navigate = useNavigate();

    return (
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
            <Box
                onClick={() => { navigate(`/products/${product.id}`) }}
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">

                <Image
                    w={300}
                    src={`https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`}
                    alt={`Picture of ${product.name}`}
                    roundedTop="lg"
                />

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {product.name}
                        </Box>
                        <Tooltip
                            label="Add to cart"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                            </chakra.a>
                        </Tooltip>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" fontSize="lg">
                                <Text mr="2" fontWeight="bold" color={"#4393ff"}>£</Text>
                            </Box>
                            {product.price.toFixed(2)}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default ProductCard;