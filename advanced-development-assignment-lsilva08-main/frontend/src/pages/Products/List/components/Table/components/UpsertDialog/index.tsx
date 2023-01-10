import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ProductListContext, ProductListContextProps } from '../../../../../../../contexts/products/list';
import { ProductUpsertContext, ProductUpsertContextProps } from '../../../../../../../contexts/products/upsert';

// import { Container } from './styles';

export interface UpsertDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const UpsertDialog: React.FC<UpsertDialogProps> = ({ isOpen, onClose }) => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const { selectedProduct, loadProducts } = useContext<ProductListContextProps>(ProductListContext);
    const { upsert, upserting, } = useContext<ProductUpsertContextProps>(ProductUpsertContext);
    const toast = useToast();

    useEffect(() => {
        (selectedProduct
            ? (() => {
                setName(selectedProduct.name)
                setDescription(selectedProduct.description)
                setPrice(selectedProduct.price)
            })
            : (() => {
                setName('')
                setDescription('')
                setPrice(0)
            })
        )()
    }, [selectedProduct])

    const onSave = async () => {
        const newProduct = await upsert(name, price, description, selectedProduct?.id || undefined);
        if (newProduct) {
            toast({
                title: 'Product saved sucessfully!',
                description: `The product was saved with sucess`,
                status: 'success',
                duration: 3500,
                isClosable: true
            });
            loadProducts();
            onClose();
        } else {
            toast({
                title: 'Failed to save product',
                description: `An error has occurred while saving the product, please try again`,
                status: 'error',
                duration: 3500,
                isClosable: true
            });
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedProduct ? `Editing product ${selectedProduct.id}` : 'Creating new product'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder='Price' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={upserting} onClick={onSave} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpsertDialog;