import { GridItem, Text } from '@chakra-ui/react';
import React from 'react';

export interface ItemDetailsProps {
  description: string;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({ description }) => {


  return <GridItem w="full" colSpan={[5, 5, 3]}>
    <Text>
      {description}
    </Text>
  </GridItem>;
}

export default ItemDetails;