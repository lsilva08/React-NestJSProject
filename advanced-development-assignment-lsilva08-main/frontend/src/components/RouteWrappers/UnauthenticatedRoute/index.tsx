import React, { useContext, useEffect, useMemo } from 'react';
import {
    Navigate
} from "react-router-dom";
import { AuthenticationContext, AuthenticationContextProps } from '../../../contexts/authentication';

const UnauthenticatedRoute: React.FC = ({ children }) => {

    const { user } = useContext<AuthenticationContextProps>(AuthenticationContext);

    const renderedComponent = useMemo(() => {
        return user ? <Navigate replace to="/products" /> : <>{children}</>;
    }, [user])

    return renderedComponent
}

export default UnauthenticatedRoute;