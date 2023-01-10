import { Box, Grid, Heading, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NotFound from '../../../components/NotFound';
import { ProductDetailsContext, ProductDetailsContextProps } from '../../../contexts/products/details';
import BuyButton from './components/BuyButton';
import ItemDetails from './components/ItemDetails';
import ItemImage from './components/ItemImage';

// import { Container } from './styles';

const ProductsDetail: React.FC = () => {

  let { productId } = useParams();
  const { loadProduct, loadingProduct, product, loaded } = useContext<ProductDetailsContextProps>(ProductDetailsContext);

  useEffect(() => {
    loadProduct(Number(productId));
    return () => { }
  }, [productId])

  const Screen = (
    <VStack spacing={70} >
      <Box>
        <Heading textAlign="center" as="h1">{product?.name}</Heading>
      </Box>
      <Grid
        h="500"
        w="full"
        templateColumns='repeat(5, 1fr)'
        gap={12}
      >
        <ItemImage />
        <ItemDetails description={product?.description || ''} />
        <BuyButton />
      </Grid>
    </VStack>
  );

  const renderedComponent = useMemo(() => {
    if (!loaded && loadingProduct) {
      return <Loader />;
    }
    if (loaded && product) {
      return Screen;
    }
    return <NotFound description='The product that you searched for was not found' />
  }, [loaded, product, loadingProduct])


  return (
    renderedComponent
  );
}

export default ProductsDetail;