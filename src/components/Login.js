import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import debounce from '../utils/debouce';
import { useNewsContext } from '../context/NewsContext';

const Login = () => {
    const { user, setUser, loading, setLoading } = useNewsContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [loginDisable, setLoginDisable] = useState(true);
    const handleButtonDisable = useRef();
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

    useEffect(() => {
        //error and login button handler. Wait 300ms before handling
        handleButtonDisable.current = debounce((name, password) => {
            setHelperText('');
            setError(false);
            if (name !== '' && password !== '') {
                setLoginDisable(false);
            } else {
                setLoginDisable(true);
            }
        }, 300);

        //cleanup on unmount
        return () => {
            handleButtonDisable.current.cancel?.();
        };
    }, []);

    useEffect(() => {
        handleButtonDisable.current?.(username, password);
    }, [username, password]);

    return user !== '' ?
        <Navigate to='/home'></Navigate>
        : (
            <Grid container spacing={8} direction='column' sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {loading && <LinearProgress />}
                <Typography fontSize='42px' paddingTop={12} fontFamily='Paytone One'>mydailyNEWS</Typography>
                <Grid size={{ xs: 6, md: 3.5 }} pb='20px'>
                    <Paper sx={{ padding: '40px 20px' }} elevation={5}>
                        <Stack spacing={1.5} component='form' onSubmit={login}>
                            <Typography variant='h5' paddingBottom={2}>Log into your account</Typography>
                            <TextField
                                autoFocus
                                label='Username'
                                variant='outlined'
                                error={error}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormControl variant='outlined'>
                                <InputLabel htmlFor='outlined-adornment-password' error={error}>Password</InputLabel>
                                <OutlinedInput
                                    id='outlined-adornment-password'
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                                onMouseUp={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    type={showPassword ? 'text' : 'password'}
                                    error={error}
                                    label='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <Typography fontSize='14px' color='error'>{helperText}</Typography>
                            <Button disabled={loginDisable} type='submit' variant='contained' color='secondary'>
                                Login
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>);
};

export default Login;