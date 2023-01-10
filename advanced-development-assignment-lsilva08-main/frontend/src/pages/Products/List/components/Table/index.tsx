import React, { useContext, useEffect } from 'react';
import { ProductListContext, ProductListContextProps } from '../../../../../contexts/products/list';
import ProductsTableTable from './components/Table';

const ProductsTable: React.FC = () => {

    const {
        loadProducts,
    } = useContext<ProductListContextProps>(ProductListContext);

    useEffect(() => {
        loadProducts();
        return () => { }
    }, []);

    return <ProductsTableTable />
}

export default ProductsTable;