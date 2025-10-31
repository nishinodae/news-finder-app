import { Link, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, CardActionArea, Box } from '@mui/material';
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
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                            {news.source.name[0]}
                        </Avatar>
                        <Box sx={{ overflow: 'hidden'}}>
                            <Typography
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {news.source.name}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {news.publishedAt.split('T')[0]}
                            </Typography>
                        </Box>
                    </Box> */}
                    <CardHeader 
                        avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>
                            {news.source.name[0]}
                        </Avatar>}
                        title=
                        {news.source.name}
                        // {<Typography 
                        //     sx={{
                        //     overflow: 'hidden',
                        //     textOverflow: 'ellipsis',
                        //     // noWrap: true,
                        //     // whiteSpace: 'nowrap',
                        //     // flex: '1 1 auto',
                        //     // width: '100%'
                        // }}
                        // >{news.source.name}</Typography>}
                        subheader={news.publishedAt.split('T')[0]}
                    />
                    <CardMedia
                        component='img'
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
                    <IconButton color={newsInFav? 'error':''} onClick={handleClick}>
                            <FavoriteIcon />
                        </IconButton>
                    {/* {newsInFav ?
                        <IconButton color='error' onClick={handleClick}>
                            <FavoriteIcon />
                        </IconButton>
                        : <IconButton onClick={handleClick}>
                            <FavoriteIcon />
                        </IconButton>
                    } */}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;