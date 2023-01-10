import React, { useContext } from 'react';
import {
    Navigate
} from "react-router-dom";
import { AuthenticationContext, AuthenticationContextProps } from '../../../contexts/authentication';

const AdminRoute: React.FC = ({ children }) => {

    const { authenticated, profile } = useContext<AuthenticationContextProps>(AuthenticationContext);

    if (!authenticated || (authenticated && profile !== 'admin')) {
        return <Navigate replace to="/" />
    }

    if (!authenticated) {
        return <Navigate replace to="/" />
    }

    return <>{children}</>;
}

export default AdminRoute;