import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

// import { Container } from './styles';

const Loader: React.FC = () => {
    return <Box w="full" height="full" display="flex" justifyContent="center">
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </Box>;
}

export default Loader;