import React, { createContext, useState } from "react";


export interface AuthenticationPageContextProps {
    currentScreen: string;
    setCurrentScreen: (screen: string) => void;
}

export const AuthenticationPageContext = createContext<AuthenticationPageContextProps>({
    currentScreen: 'signin',
    setCurrentScreen: () => { }
});

const AuthenticationPageContextProvider: React.FC = ({ children }) => {

    const [currentScreen, setCurrentScreen] = useState<string>('signin');

    return (
        <AuthenticationPageContext.Provider value={{
            currentScreen,
            setCurrentScreen
        }}>
            {children}
        </AuthenticationPageContext.Provider>
    )

}

export default AuthenticationPageContextProvider;