import { Button, IconButton, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useNewsContext } from '../context/NewsContext';

const Login = () => {
    const { user, setUser, loading, setLoading } = useNewsContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorState, setErrorState] = useState({ error: false, helper: '', disabled: true });
    const navigate = useNavigate();

    const login = (e) => {
        setLoading(true);
        e.preventDefault();
        if (username === 'Safa' && password === 'password') {
            setUser(username);
            navigate('/home');
        }
        else {
            setErrorState({ error: true, helper: 'Your username or password is incorrect', disabled: false });
        }
        setLoading(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleUsername = (value) => {
        setUsername(value);
        setErrorState(prev => ({
            ...prev,
            error: false,
            helper: '',
            disabled: !(value && password)
        }));
    };

    const handlePassword = (value) => {
        setPassword(value);
        setErrorState(prev => ({
            ...prev,
            error: false,
            helper: '',
            disabled: !(value && username)
        }));
    };

    if (user !== '') return <Navigate to='/home'></Navigate>;

    return (
        <>
            <LinearProgress
                aria-label='linear-progress'
                sx={{
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    zIndex: 1100,
                    opacity: loading ? 1 : 0,
                    pointerEvents: 'none'
                }} />
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography fontSize='42px' padding='40px 0' fontFamily='Paytone One'>mydailyNEWS</Typography>
                <Paper sx={{ padding: '40px', mb: '20px' }} elevation={5}>
                    <Stack spacing={2} component='form' onSubmit={login}>
                        <Typography variant='h5' pb={2}>Log into your account</Typography>
                        <TextField
                            autoFocus
                            label='Username'
                            error={errorState.error}
                            value={username}
                            onChange={(e) => handleUsername(e.target.value)}
                        />
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            error={errorState.error}
                            value={password}
                            onChange={(e) => handlePassword(e.target.value)} slotProps={{
                                input: {
                                    endAdornment:
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='visibility'
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
                        {errorState.error && <Typography fontSize='14px' color='error'>{errorState.helper}</Typography>}
                        <Button disabled={errorState.disabled} type='submit' variant='contained'>
                            Login
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </>);
};

export default Login;