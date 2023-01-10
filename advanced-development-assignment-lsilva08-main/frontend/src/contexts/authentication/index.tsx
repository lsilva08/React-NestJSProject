import React, { createContext, useState } from 'react';
import { SigninResponse } from '../../contracts/authentication';
import { signin, signup } from '../../services/authentication.service';

export interface AuthenticationContextProps {
    authenticated?: boolean;
    token?: string;
    user?: {
        id: string;
        email: string;
    };
    profile?: string;
    authenticating: boolean;
    authenticate: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    restoreAuthData: (
        user: {
            id: string;
            email: string;
            profile: string;
        },
    ) => void;
    clearAuthData: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
    authenticate: async () => { },
    register: async () => { },
    authenticating: false,
    restoreAuthData: () => { },
    clearAuthData: () => { }
});


const AuthenticationProvider: React.FC = ({ children }) => {

    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<{ id: string, email: string }>();
    const [profile, setProfile] = useState<string>();

    const authenticate = async (email: string, password: string) => {
        setAuthenticating(true);
        try {
            const response = await signin(email, password);
            fillSigninData(response);
        } catch (err) {
            alert('Usuário e/ou senha inválidos')
        } finally {
            setAuthenticating(false);
        }
    }

    const register = async (name: string, email: string, password: string) => {
        setAuthenticating(true);
        try {
            const response = await signup(name, email, password);
            fillSigninData(response);
        } catch (err) {
            alert('Usuário já existe')
        } finally {
            setAuthenticating(false);
        }
    }

    const fillSigninData = (response: SigninResponse) => {
        setToken(response.token);
        setUser(response.user);
        setProfile(response.user.profile);
        setAuthenticated(true);
    }


    const restoreAuthData = (
        user: {
            id: string;
            email: string;
            profile: string;
        },
    ) => {
        setUser(user);
        setProfile(profile)
    }

    const clearAuthData = () => {
        localStorage.removeItem('@userData')
        setUser(undefined)
        setProfile(undefined)
    }

    return <AuthenticationContext.Provider value={{ authenticated, token, user, profile, authenticate, register, authenticating, restoreAuthData, clearAuthData }}>
        {children}
    </AuthenticationContext.Provider>;
}

export default AuthenticationProvider;