import { Link, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNewsContext } from '../context/NewsContext';
import placeholder from '../assets/placeholder-image.png';

const NewsItem = ({ news, size }) => {
    const { fav, addNewsToFav, removeNewsFromFav } = useNewsContext();
    const newsInFav = fav.some(e => e.title === news.title);

    const handleClick = () => {
        newsInFav ?
            removeNewsFromFav(news.title)
            : addNewsToFav(news);
    };

    return (
        <Grid size={size}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Link href={news.url} target='_blank' rel='noreferrer' underline='none' color='black' >
                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>
                            {news.source.name[0]}
                        </Avatar>}
                        title={news.source.name}
                        subheader={news.publishedAt.split('T')[0]}
                    />
                    <CardMedia
                        component='img'
                        loading='lazy'
                        height='194'
                        src={news.urlToImage || placeholder}
                        alt='image not available'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = placeholder;
                        }}
                    />
                    <CardContent>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            {news.title}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions sx={{ mt: 'auto' }}>
                    <IconButton color={newsInFav ? 'error' : ''} onClick={handleClick}>
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;