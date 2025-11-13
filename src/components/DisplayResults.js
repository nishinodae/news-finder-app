import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';
import NewsItem from './NewsItem';

const DisplayResults = () => {
    const { news, page, setPage, retrieveNews, errorMessage, setError } = useNewsContext();

    const handleLoadMore = async () => {
        let newpage = page + 1;
        await setPage(newpage);
        await retrieveNews(newpage);
    };

    return (<Grid size='grow' mb='10px'>
        <Box
            sx={{
                position: 'sticky',
                top: '64px',
                zIndex: 1100,
                bgcolor: 'secondary.main',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '7px 0'
            }}
        >
            <Typography>Results({news.length})</Typography>
        </Box>
        <Grid container spacing={2} pb='20px'>
            {news.map((newsItem, index) => <NewsItem key={index} news={newsItem} size={news.length === 1 ? 12 : { xs: 12, sm: 6, md: 4, lg: 3 }}></NewsItem>)}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button variant='contained' onClick={handleLoadMore}>Load more</Button>
        </Box>
        <Snackbar
            open={errorMessage !== ''}
            onClose={() => setError('')}
            message={errorMessage}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    </Grid>);
};

export default DisplayResults;