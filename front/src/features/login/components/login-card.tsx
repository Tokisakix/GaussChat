import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Heading, Flex, Text, Box, Link, Button, Callout, Inset } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Link as RouterLink } from 'react-router-dom';



export function LoginCard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();  // Initialize useNavigate for redirection

    const handleLogin = async (event: any) => {
        event.preventDefault();
        setError(null);
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/login/',
                { username, password }
            );

            Cookies.set('token', response.data.token);

            navigate('/');

        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.error || 'Something went wrong!');
            } else {
                console.log(error);
                setError(error.message);
            }
        }
    };

    return (
        <div className="main-page font-work-sans w-screen h-screen flex overflow-hidden">
            <div className="w-full h-full flex justify-center items-center align-middle">
                <Card size="4" style={{ width: 400 }}>
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src="bs.png"
                            alt="Bold typography"
                            style={{
                                display: 'block',
                                objectFit: 'cover',
                                width: '100%',
                                height: 140,
                                backgroundColor: 'var(--gray-5)',
                            }}
                        />
                    </Inset>
                    <div className='flex justify-between'>
                        <Heading as="h3" size="6" trim="start" mb="5">
                            Sign in
                        </Heading>
                        <div>

                        </div>
                    </div>

                    <Box mb="5">
                        <label>
                            <Text as="div" size="2" weight="medium" mb="1">
                                Username
                            </Text>
                            <TextField.Root placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </Box>

                    <Box mb="5" position="relative">
                        <Flex align="baseline" justify="between" mb="1">
                            <Text as="label" size="2" weight="medium" htmlFor="card-password-field">
                                Password
                            </Text>
                            <Link href="#" size="2">
                                Forgot password?
                            </Link>
                        </Flex>
                        <TextField.Root
                            id="card-password-field"
                            placeholder="Enter your password"
                            type='password'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Box>

                    <Flex mt="6" justify="between" gap="3">
                        <RouterLink to="/register" tabIndex={-1}>
                            <Button variant="soft">
                                Create an account
                            </Button>
                        </RouterLink>
                        <Button onClick={handleLogin}>Sign in</Button>
                    </Flex>

                    {
                        error &&
                        <Callout.Root color='red' className='mt-4'>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                Login failed, please try again.
                            </Callout.Text>
                        </Callout.Root>
                    }
                </Card>
            </div >
        </div >
    );
};
