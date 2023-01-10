import React, { useState } from 'react';
import * as _ from 'lodash';
import { Product } from '../../../typings';
import { upsertProduct } from '../../../services/products.service';

export interface ProductUpsertContextProps {
    upserting: boolean;
    upsert: (name: string, price: number, description: string, id?: number) => Promise<Product | undefined>;
}

export const ProductUpsertContext = React.createContext<ProductUpsertContextProps>({
    upserting: false,
    upsert: async () => { return undefined; }
});

const ProductsUpsertProvider: React.FC = ({ children }) => {

    const [upserting, setUpserting] = useState<boolean>(false);

    const upsert = async (name: string, price: number, description: string, id?: number): Promise<Product | undefined> => {
        setUpserting(true);
        let product;
        try {
            product = await upsertProduct(name, price, description, id);
        } finally {
            setUpserting(false);
        }
        return product;
    }

    return <ProductUpsertContext.Provider value={{
        upserting,
        upsert,
    }}>
        {children}
    </ProductUpsertContext.Provider>;
}

export default ProductsUpsertProvider;