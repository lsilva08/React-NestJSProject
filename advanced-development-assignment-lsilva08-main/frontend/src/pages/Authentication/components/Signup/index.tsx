import React, { useContext, useState } from 'react';
import {
    Alert,
    AlertIcon,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    VStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import {
    ViewIcon, ViewOffIcon
} from '@chakra-ui/icons';

import { AuthenticationPageContext, AuthenticationPageContextProps } from '../../../../contexts/authentication/page';
import { AuthenticationContext, AuthenticationContextProps } from '../../../../contexts/authentication';
import UnauthenticatedRoute from '../../../../components/RouteWrappers/UnauthenticatedRoute';
import { useNavigate } from 'react-router';

const Signup: React.FC = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [wrongConfirmPassword, setWrongConfirmPassword] = useState<boolean>(false);

    const { register, authenticating } = useContext<AuthenticationContextProps>(AuthenticationContext);

    const signup = () => {
        setWrongConfirmPassword(false);
        if (password === confirmPassword) {
            register(name, email, password);
            return;
        }
        else {
            setWrongConfirmPassword(true);
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </FormControl>
                        <VStack>
                            {
                                wrongConfirmPassword &&
                                <Alert status='error'>
                                    <AlertIcon />
                                    The passwords doesn't match
                                </Alert>
                            }
                            <Box>
                                <HStack>
                                    <Box>
                                        <FormControl id="password" isRequired>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                                <InputRightElement h={'full'}>
                                                    <Button
                                                        variant={'ghost'}
                                                        onClick={() =>
                                                            setShowPassword((showPassword) => !showPassword)
                                                        }>
                                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl id="confirmPassword" isRequired>
                                            <FormLabel>Confirm password</FormLabel>
                                            <InputGroup>
                                                <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                                <InputRightElement h={'full'}>
                                                    <Button
                                                        variant={'ghost'}
                                                        onClick={() =>
                                                            setShowPassword((showPassword) => !showPassword)
                                                        }>
                                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                    </Box>
                                </HStack>
                            </Box>
                        </VStack>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={signup}
                                disabled={authenticating}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );

}

export default Signup;