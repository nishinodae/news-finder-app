import { Grid } from '@mui/material';
import Header from './Header';
import MyFavPanel from './MyFavPanel';
import CustomSnackbar from './CustomSnackbar';
import { useNewsContext } from '../context/NewsContext';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const DisplayResults = lazy(() => import('./DisplayResults'));

const Home = () => {
    const { user, fav, news } = useNewsContext();

    return user === '' ? <Navigate to='/'></Navigate> : (
        <Grid container direction='column'>
            <Header />
            <Grid container sx={{ p: '0 20px' }} spacing={3}>
                {fav.length !== 0 && <MyFavPanel />}
                {news.length === 0 ? <CustomSnackbar /> : <DisplayResults />}
            </Grid>
        </Grid>
    );
};

export default Home;