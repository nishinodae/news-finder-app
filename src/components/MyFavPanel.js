import { Box, Button, Card, CardContent, IconButton, Link, Stack, Typography } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MyFavPanel = () => {
    const { fav, setFav } = useNewsContext();
    const handleClear = () => {
        setFav([]);
    };
    return (
        <Stack width={{ xs: 150, md: 200, lg: 250 }} mb='10px'>
            <Box
                sx={{
                    position: 'sticky',
                    top: '64px',
                    zIndex: 1100,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                <Button onClick={handleClear}>Clear ({fav.length})</Button>
            </Box>
            <Box
                sx={{
                    position: 'sticky',
                    top: '100px',
                    pr: '5px',
                    maxHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                <Stack rowGap={2}>
                    {fav.map((news, index) => <FavItem key={index} news={news}></FavItem>)}
                </Stack>
            </Box>

        </Stack>
    );
};

export default MyFavPanel;

const FavItem = ({ news }) => {
    const { removeNewsFromFav } = useNewsContext();
    const handleClick = () => {
            removeNewsFromFav(news.title);
    };
    return (
        <Card size={12}>
            <Link href={news.url} target='_blank' rel='noreferrer' underline='none' color='inherit'>
                <CardContent>
                    <Typography variant='body2'>
                        {news.title}
                    </Typography>
                </CardContent>
            </Link>
            <IconButton color='error' onClick={handleClick}>
                <FavoriteIcon />
            </IconButton>
        </Card>
    );
};