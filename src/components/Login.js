import { Button, IconButton, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useDebounced from '../utils/debouce';
import { useNewsContext } from '../context/NewsContext';

const Login = () => {
    const { user, setUser, loading, setLoading } = useNewsContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [loginDisable, setLoginDisable] = useState(true);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const login = (e) => {
        setLoading(true);
        e.preventDefault();
        if (username === 'Safa' && password === 'password') {
            setUser(username);
            navigate('/home');
        }
        else {
            setHelperText('Your username or password is incorrect');
            setError(true);
        }
        setLoading(false);
    };

    const resetLoginError = useDebounced((name, pw) => {
        setHelperText('');
        setError(false);
        if (name !== '' && pw !== '') {
            setLoginDisable(false);
        } else {
            setLoginDisable(true);
        }
    }, 300);

    useEffect(() => {
        resetLoginError(username, password);
    }, [username, password]);

    return user !== '' ?
        <Navigate to='/home'></Navigate>
        : (
            <>
                {loading && 
                <LinearProgress sx={{
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    zIndex: 1100,
                }} />
                }
                <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Typography fontSize='42px' padding='40px 0' fontFamily='Paytone One'>mydailyNEWS</Typography>
                    <Paper sx={{ padding: '40px 20px', mb: '20px' }} elevation={5}>
                        <Stack spacing={2} component='form' onSubmit={login}>
                            <Typography variant='h5' pb={2}>Log into your account</Typography>
                            <TextField
                                autoFocus
                                label='Username'
                                error={error}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                label='Password'
                                error={error}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                slotProps={{
                                    input: {
                                        endAdornment:
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                    }
                                }}
                            />
                            {error&&<Typography fontSize='14px' color='error'>{helperText}</Typography>}
                            <Button disabled={loginDisable} type='submit' variant='contained'>
                                Login
                            </Button>
                        </Stack>
                    </Paper>
                </Stack>
            </>);
};

export default Login;