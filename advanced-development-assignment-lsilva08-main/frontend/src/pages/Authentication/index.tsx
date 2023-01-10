import React, { useContext, useMemo } from 'react';
import { AuthenticationPageContext, AuthenticationPageContextProps } from '../../contexts/authentication/page';
import UnauthenticatedRoute from '../../components/RouteWrappers/UnauthenticatedRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { Center, Divider, HStack } from '@chakra-ui/layout';

const Authentication: React.FC = () => {

    const { currentScreen } = useContext<AuthenticationPageContextProps>(AuthenticationPageContext);

    const renderedScreen = useMemo(() => {
        return currentScreen === 'signin' ? <Signin /> : <Signup />
    }, [currentScreen])

    return <UnauthenticatedRoute>
        <HStack display={"flex"} w={"full"} justifyContent={"space-evenly"} spacing={10}>
            <Signin></Signin>
            <Center height='200px'>
                <Divider color={"white"} orientation='vertical' />
            </Center>
            <Signup></Signup>
        </HStack>
    </UnauthenticatedRoute>
}

export default Authentication;