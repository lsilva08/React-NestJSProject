import React, { useContext, useEffect, useMemo } from 'react';
import { AuthenticationContext, AuthenticationContextProps } from '../../../contexts/authentication';

import { ProductListContextProps, ProductListContext } from '../../../contexts/products/list'
import ProductsGrid from './components/Grid';
import ProductsTable from './components/Table';

const ProductsList: React.FC = () => {

  const { profile } = useContext<AuthenticationContextProps>(AuthenticationContext);
  const { loadProducts } = useContext<ProductListContextProps>(ProductListContext);

  useEffect(() => {
    loadProducts();
    return () => { }
  }, [])

  const renderizedComponent = useMemo(() => (profile === 'admin' ? <ProductsTable /> : <ProductsGrid />), [profile])

  return renderizedComponent;
}

export default ProductsList;