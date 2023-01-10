import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react'
import { OrderDetailsContextProps, OrderDetailsContext } from '../../../../../contexts/orders/details'
import { TriangleDownIcon } from '@chakra-ui/icons';
// import { Container } from './styles';

const Marker = ({ }: any) => <TriangleDownIcon w={8} h={8} color="red.500" />;


const Maps: React.FC = () => {

    const { orderTracking } = useContext<OrderDetailsContextProps>(OrderDetailsContext)

    return <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCESh3xcASWtbSe98W0nAAzDUkyCKeaO_s' }}
            defaultCenter={{
                lat: 50.780659166218896,
                lng: -1.901642686946264
            }}
            defaultZoom={11}
        >
            {orderTracking?.positions.map(({ latitude, longitude, address }) => (
                <Marker
                    key="test"
                    lat={latitude}
                    lng={longitude}
                />
            ))}

        </GoogleMapReact>;
    </div>

}

export default Maps;