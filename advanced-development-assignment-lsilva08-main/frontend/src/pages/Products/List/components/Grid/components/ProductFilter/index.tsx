import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React, { useContext, useState } from 'react';
import { ProductListContext, ProductListContextProps } from '../../../../../../../contexts/products/list';

// import { Container } from './styles';

const ProductFilter: React.FC = () => {

    const [filter, setFilter] = useState<string>('');
    const { filterProductsList } = useContext<ProductListContextProps>(ProductListContext);

    return <InputGroup size='md'>
        <Input
            pr='4.5rem'
            type={'text'}
            placeholder='Search for a product'
            onChange={(e) => setFilter(e.target.value)}
        />
        <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => { filterProductsList(filter) }}>
                Search
            </Button>
        </InputRightElement>
    </InputGroup>;
}

export default ProductFilter;