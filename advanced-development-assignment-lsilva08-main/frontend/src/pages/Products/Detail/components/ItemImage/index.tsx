import { GridItem, Image } from '@chakra-ui/react';
import React from 'react';

const ItemImage: React.FC = () => {
    return <GridItem
        w="full"
        colSpan={[5, 5, 2]}
        display="flex"
        justifyContent="center">
        <Image
            h="100%"
            objectFit='cover'
            src={`https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`}
            alt={`Picture of `}
            roundedTop="lg"
        />
    </GridItem>;
}

export default ItemImage;