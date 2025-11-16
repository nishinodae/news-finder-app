import { Grid } from '@mui/material';
import Header from './Header';
import MyFavPanel from './MyFavPanel';
import CustomSnackbar from './CustomSnackbar';
import { useNewsContext } from '../context/NewsContext';
import { Navigate } from 'react-router-dom';
import DisplayResults from './DisplayResults';
import { useState } from 'react';

const Home = () => {
    const { user, fav, news } = useNewsContext();
    const [typingValue, setTypingValue] = useState('');

    return user === '' ? <Navigate to='/'></Navigate> : (
        <Grid container direction='column'>
            <Header typingValue={typingValue} setTypingValue={setTypingValue} />
            <Grid container sx={{ p: '0 20px' }} spacing={3}>
                {fav.length !== 0 && <MyFavPanel />}
                {news.length === 0 ? <CustomSnackbar typingValue={typingValue} /> : <DisplayResults />}
            </Grid>
        </Grid>
    );
};

export default Home;