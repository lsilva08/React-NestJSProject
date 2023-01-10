import { Button, GridItem, HStack, Input, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { AuthenticationContext, AuthenticationContextProps } from '../../../../../contexts/authentication';
import { ProductDetailsContext, ProductDetailsContextProps } from '../../../../../contexts/products/details';

const BuyButton: React.FC = () => {

    const { product, buying, buyProduct } = useContext<ProductDetailsContextProps>(ProductDetailsContext);
    const { user } = useContext<AuthenticationContextProps>(AuthenticationContext);
    const [quantity, setQuantity] = useState<number>(1);
    const toast = useToast()

    const buy = async () => {
        const buyResponse = await buyProduct(user!!.id, product!!.id, quantity);
        if (buyResponse) {
            toast({
                title: 'Bougth with sucess!',
                description: `You've bougth ${quantity} of product ${product!!.name} with sucess!`,
                status: 'success',
                duration: 3500,
                isClosable: true
            });
        } else {
            toast({
                title: 'Failed to buy',
                description: `An error has occurred while buying the product, please try again`,
                status: 'error',
                duration: 3500,
                isClosable: true
            });
        }
    }

    return <GridItem h="fit-content" display="flex" justifyContent="center" colSpan={5}>
        <HStack w="150px" textAlign="center" >
            <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <Button onClick={buy} disabled={buying} colorScheme="blue" pl="8" pr="8" >Buy</Button>
            {user?.id}
        </HStack>
    </GridItem>

}

export default BuyButton;