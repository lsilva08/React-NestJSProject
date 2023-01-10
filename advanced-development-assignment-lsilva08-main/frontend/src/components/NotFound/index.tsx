import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

// import { Container } from './styles';

export interface NotFoundProps {
    description: string;
}

const NotFound: React.FC<NotFoundProps> = ({ description }) => {
    return <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
            Not found
        </Heading>
        <Text color={'gray.500'}>
            {description}
        </Text>
    </Box>;
}

export default NotFound;