import React, { useContext } from 'react';
import {
    Navigate
} from "react-router-dom";
import { AuthenticationContext, AuthenticationContextProps } from '../../../contexts/authentication';

const AuthenticatedRoute: React.FC = ({ children }) => {

    const { user } = useContext<AuthenticationContextProps>(AuthenticationContext);

    if (!user) {
        return <Navigate replace to="/" />
    }

    return <>{children}</>;
}

export default AuthenticatedRoute;