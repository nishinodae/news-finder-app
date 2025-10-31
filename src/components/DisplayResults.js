import { Box, Button, Container, Grid, Snackbar, SnackbarContent, Stack, Typography } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';
import NewsItem from './NewsItem';
import CustomSnackbar from './CustomSnackbar';

const DisplayResults = () => {
    const { news, page, setPage, searchTerm, retrieveNews, errorMessage, setError } = useNewsContext();

    const handleLoadMore = async () => {
        let newpage = page + 1;
        await setPage(newpage);
        await retrieveNews(newpage);
    };

    // return news.length === 0 && searchTerm === '' ?
    //     <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    //         <SnackbarContent sx={{ bgcolor: 'purple' }} message='Search something to start.' />
    //     </Snackbar>
    //     : news.length === 0 && searchTerm !== '' && errorMessage === '' ?
    //         <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    //             <SnackbarContent sx={{ bgcolor: 'purple' }} message='Press Enter or click Search Icon once you are done' />
    //         </Snackbar>
    //         : news.length === 0 && errorMessage === 'No result found.' ?
    //             //     <Typography flex={1} textAlign='center'>No result found</Typography>
    //             <Snackbar
    //                 open={errorMessage === 'No result found.'}
    //                 onClose={() => setError('')}
    //                 message={errorMessage}
    //                 autoHideDuration={5000}
    //                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
    //             :
    return news.length === 0 ?
        <CustomSnackbar />
        :
        (
            <Grid size='grow' mb='10px'>
                <Box
                    sx={{
                        position: 'sticky',
                        top: '64px',
                        zIndex: 1100,
                        bgcolor: 'rgb(17, 17, 47)',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: '7px 0'
                    }}
                >
                    <Typography>Results({news.length})</Typography>
                </Box>
                <Grid container spacing={2} pb='20px'>
                    {news.map((newsItem, index) => <NewsItem key={index} news={newsItem} size={news.length === 1 ? 12: { xs: 12, sm:6, md: 4, lg: 3 }}></NewsItem>)}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='contained' sx={{ bgcolor: 'secondary.main' }} onClick={handleLoadMore}>Load more</Button>
                </Box>
                <Snackbar
                    open={errorMessage !== ''}
                    onClose={() => setError('')}
                    message={errorMessage}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </Grid>

        );
};

export default DisplayResults;