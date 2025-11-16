import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';
import NewsItem from './NewsItem';
import { memo } from 'react';

const DisplayResults = () => {
    const { searchTerm, news, page, setPage, retrieveNews, errorMessage, setError } = useNewsContext();

    const handleLoadMore = async () => {
        let newpage = page + 1;
        await setPage(newpage);
        await retrieveNews(newpage, searchTerm);
    };

    return (<Grid size='grow'>
        <Box
            sx={{
                position: 'sticky',
                top: '64px',
                zIndex: 1100,
                bgcolor: 'secondary.main',
                p: '7px 0'
            }}
        >
            <Typography>Search Result: {searchTerm} ({news.length})</Typography>
        </Box>
        <Box display='flex' flexWrap='wrap' gap={2}>
            {news.map((newsItem, index) => <NewsItem key={index} news={newsItem} size={news.length === 1 ? 12 : { xs: 12, sm: 6, md: 4, lg: 3 }}></NewsItem>)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} m='20px 0'>
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

export default memo(DisplayResults);