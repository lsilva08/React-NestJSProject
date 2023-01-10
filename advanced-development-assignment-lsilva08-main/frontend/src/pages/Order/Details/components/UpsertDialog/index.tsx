import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { createNewPosition } from '../../../../../services/tracking.service'
import { OrderDetailsContext, OrderDetailsContextProps } from '../../../../../contexts/orders/details';


const UpsertDialog: React.FC = () => {

    const { order, loadOrder, onClose, isOpen } = useContext<OrderDetailsContextProps>(OrderDetailsContext);
    const [address, setAddress] = useState<string>('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [upserting, setUpserting] = useState<boolean>(false);
    const toast = useToast();

    const onSave = async () => {
        setUpserting(true)
        const newTracking = await createNewPosition(order!!.id, address, latitude, longitude);
        if (newTracking) {
            toast({
                title: 'Tracking updated sucessfully!',
                description: `The tracking was updated with sucess`,
                status: 'success',
                duration: 3500,
                isClosable: true
            });
            loadOrder(order!!.id);
            onClose();
        } else {
            toast({
                title: 'Failed to update tracking',
                description: `An error has occurred while updating the tracking, please try again`,
                status: 'error',
                duration: 3500,
                isClosable: true
            });
        }
        setUpserting(false)
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Updating tracking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input address={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Latitude</FormLabel>
                            <Input type="number" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} placeholder='Latitude' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Longitude</FormLabel>
                            <Input value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} type="number" placeholder='Longitude' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={upserting} onClick={onSave} colorScheme='blue' mr={3}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpsertDialog;