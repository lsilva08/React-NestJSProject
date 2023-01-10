import { createContext, useState } from "react";
import { buyProduct, findProductById } from "../../../services/products.service";
import { Product } from "../../../typings";

export interface ProductDetailsContextProps {
    product?: Product;
    loadingProduct: boolean;
    loaded: boolean;
    loadProduct: (productId: number) => Promise<void>;
    buying: boolean;
    buyProduct: (userId: string, productId: number, quantity: number) => Promise<boolean>;
}

export const ProductDetailsContext = createContext<ProductDetailsContextProps>({
    loadingProduct: false,
    loaded: false,
    buying: false,
    loadProduct: async () => { },
    buyProduct: async () => true
})

const ProductDetailsContextProvider: React.FC = ({ children }) => {

    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [buying, setBuying] = useState(false);
    const [product, setProduct] = useState<Product | undefined>(undefined);

    const loadProduct = async (productId: number) => {
        setLoadingProduct(true);
        setTimeout(async () => {
            try {
                const foundProduct = await findProductById(productId);
                setProduct(foundProduct);
            } catch (err) {
                setProduct(undefined);
            } finally {
                setLoadingProduct(false);
                setLoaded(true);
            }
        }, 3000)
    }

    const buy = async (userId: string, productId: number, quantity: number): Promise<boolean> => {
        setBuying(true);
        let bought;
        try {
            await buyProduct(userId, productId, quantity);
            setBuying(false);
            bought = true;
        } catch (err) {
            setProduct(undefined);
            bought = false;
        } finally {
            setBuying(false);
        }
        return bought;
    }

    return (
        <ProductDetailsContext.Provider value={{
            loadingProduct,
            product,
            loadProduct,
            loaded,
            buying,
            buyProduct: buy
        }}>
            {children}
        </ProductDetailsContext.Provider>
    )
}

export default ProductDetailsContextProvider;