import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Navigate,
    Route
} from "react-router-dom";
import AuthenticationProvider, { AuthenticationContext, AuthenticationContextProps } from '../../contexts/authentication';
import AuthenticationPageProvider from '../../contexts/authentication/page';
import ProductsListProvider from '../../contexts/products/list';
import Authentication from '../../pages/Authentication';
import Navbar from '../../components/Navbar';
import ProductsList from '../../pages/Products/List';
import ProductDetailsContextProvider from '../../contexts/products/details';
import ProductsDetail from '../../pages/Products/Detail';
import OrderListContextProvider from '../../contexts/orders';
import OrderDetailsContextProvider from '../../contexts/orders/details';
import OrderList from '../../pages/Order/List';
import OrderDetails from '../../pages/Order/Details';
import AuthenticatedRoute from '../../components/RouteWrappers/AuthenticatedRoute';
import Signin from '../../pages/Authentication/components/Signin';
import Signup from '../../pages/Authentication/components/Signup';

const AppRoutes: React.FC = () => {

    const { user, restoreAuthData } = useContext<AuthenticationContextProps>(AuthenticationContext);
    if (!user) {
        const localStorageData = localStorage.getItem('@userData')
        if (localStorageData) {
            const data = JSON.parse(localStorageData);
            restoreAuthData(data)
        }
    }

    return <Router>
        <Routes>
            <Route path="/" element={
                <AuthenticationPageProvider>
                    <Authentication />
                </AuthenticationPageProvider>
            } />
            <Route path="/signin" element={
                <AuthenticationPageProvider>
                    <Signin />
                </AuthenticationPageProvider>
            } />
            <Route path="/signup" element={
                <AuthenticationPageProvider>
                    <Signup />
                </AuthenticationPageProvider>
            } />
            <Route path="/products" element={
                <AuthenticatedRoute>
                    <Navbar>
                        <ProductsListProvider>
                            <ProductsList />
                        </ProductsListProvider>
                    </Navbar>
                </AuthenticatedRoute>
            } />
            <Route path="/products/:productId" element={
                <AuthenticatedRoute>
                    <Navbar>
                        <ProductDetailsContextProvider>
                            <ProductsDetail />
                        </ProductDetailsContextProvider>
                    </Navbar>
                </AuthenticatedRoute>
            } />
            <Route path="/orders" element={
                <AuthenticatedRoute>
                    <Navbar>
                        <OrderListContextProvider>
                            <OrderList />
                        </OrderListContextProvider>
                    </Navbar>
                </AuthenticatedRoute>
            } />
            <Route path="/orders/:orderId" element={
                <AuthenticatedRoute>
                    <Navbar>
                        <OrderDetailsContextProvider>
                            <OrderDetails />
                        </OrderDetailsContextProvider>
                    </Navbar>
                </AuthenticatedRoute>
            } />
        </Routes>
    </Router>
}

export default AppRoutes;