import React, { useMemo, useState } from 'react';
import * as _ from 'lodash';
import { Product } from '../../../typings';
import { findProducts } from '../../../services/products.service';

export interface ProductListContextProps {
  products: Product[];
  allProducts: Product[];
  loadingProducts: boolean;
  currentPage: number;
  error: string;
  pages: number;
  selectedProduct?: Product;
  changePage: (nextPage: number) => void;
  filterProductsList: (filter: string) => void;
  loadProducts: () => Promise<void>;
  selectProduct: (product?: Product) => void;
}

export const ProductListContext = React.createContext<ProductListContextProps>({
  products: [],
  allProducts: [],
  loadingProducts: false,
  currentPage: 0,
  error: '',
  pages: 1,
  changePage: () => { },
  filterProductsList: () => { },
  loadProducts: async () => { },
  selectProduct: () => { },
});

const ProductsListProvider: React.FC = ({ children }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [error, setError] = useState<string>('');

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const foundProducts = await findProducts();
      setProducts(foundProducts);
    } catch (error: any) {
      setProducts([]);
      setError(error.message)
    } finally {
      setLoadingProducts(false);
    }
  }

  const filteredProducts = useMemo(() => {
    const productsChunked = _.chunk(
      products.filter(product => filter ? product.name.includes(filter) : true),
      8
    );
    setPages(productsChunked.length);
    return productsChunked[currentPage];
  }, [filter, products, currentPage])

  const changePage = (nextPage: number) => setCurrentPage(nextPage);

  const filterProductsList = (filter: string) => setFilter(filter);

  return <ProductListContext.Provider value={{
    allProducts: products,
    products: filteredProducts,
    loadingProducts,
    currentPage,
    changePage,
    filterProductsList,
    loadProducts,
    pages,
    selectedProduct,
    selectProduct: setSelectedProduct,
    error
  }}>
    {children}
  </ProductListContext.Provider>;
}

export default ProductsListProvider;