import { Grid } from '@mui/material';
import Header from './Header';
import DisplayResults from './DisplayResults';
import MyFavPanel from './MyFavPanel';
import { useNewsContext } from '../context/NewsContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
    const { user, fav } = useNewsContext();
    return user === '' ?
        <Navigate to='/'></Navigate> : (
            <Grid container direction='column'>
                <Header />
                <Grid container sx={{ p: '0 20px' }} spacing={3}>
                    {fav.length !== 0 && <MyFavPanel />}
                    <DisplayResults />
                </Grid>
            </Grid>
        );
};

export default Home;