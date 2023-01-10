import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { ProductListContext, ProductListContextProps } from '../../../../../../../contexts/products/list';

// import { Container } from './styles';

const ProductPagination: React.FC = () => {

    const { pages, changePage, currentPage } = useContext<ProductListContextProps>(ProductListContext);

    const previousPage = () => {
        changePage(currentPage - 1);
    }

    const nextPage = () => {
        changePage(currentPage + 1);
    }

    return <Flex flex={1} alignItems="center">
        <Box flex={1} textAlign="center">
            <Button onClick={previousPage} disabled={currentPage === 0} colorScheme="blue">Previous page</Button>
        </Box>
        <Box flex={1} textAlign="center">
            <Button onClick={nextPage} disabled={currentPage === (pages - 1)} colorScheme="blue">Next page</Button>
        </Box>
    </Flex>;
}

export default ProductPagination;