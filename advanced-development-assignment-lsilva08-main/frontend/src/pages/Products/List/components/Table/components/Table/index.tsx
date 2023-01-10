import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Tfoot, HStack, IconButton, Button, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { Product } from '../../../../../../../typings';
import { ProductListContext, ProductListContextProps } from '../../../../../../../contexts/products/list';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import UpsertDialog from '../UpsertDialog';
import ProductsUpsertProvider from '../../../../../../../contexts/products/upsert';

const ProductsTableTable: React.FC = () => {

    const { allProducts, selectProduct } = useContext<ProductListContextProps>(ProductListContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onEdit = (product: Product) => {
        selectProduct(product);
        onOpen();
    };

    const onCreate = () => {
        selectProduct(undefined);
        onOpen();
    }

    return (
        <ProductsUpsertProvider>
            <Table variant="simple">
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric><Button onClick={onCreate} colorScheme="blue">New</Button></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {allProducts?.map((product: Product) => (
                        <Tr key={product.id}>
                            <Td>{product.id}</Td>
                            <Td>{product.name}</Td>
                            <Td>{product.description}</Td>
                            <Td isNumeric>R${product.price.toFixed(2)}</Td>
                            <Td>
                                <HStack display="flex" justifyContent="flex-end" spacing={4}>
                                    <IconButton
                                        colorScheme='blue'
                                        aria-label='Edit Product'
                                        icon={<EditIcon onClick={() => { onEdit(product) }} />}
                                    />
                                    <IconButton
                                        colorScheme='red'
                                        aria-label='Delete product'
                                        icon={<DeleteIcon />}
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>ID</Th>
                        <Th>name</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric><Button onClick={onCreate} colorScheme="blue">New</Button></Th>
                    </Tr>
                </Tfoot>
            </Table>
            <UpsertDialog isOpen={isOpen} onClose={onClose} />
        </ProductsUpsertProvider>
    )
}

export default ProductsTableTable;