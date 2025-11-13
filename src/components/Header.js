import { Avatar, Chip, Grid, IconButton, InputBase, LinearProgress, Paper, Stack, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNewsContext } from '../context/NewsContext';

const Header = () => {
    const { user, setUser, searchTerm, setSearch, retrieveNews, loading, setLoading } = useNewsContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);
        setUser('');
        navigate('/');
        setLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        retrieveNews(1);
    };

    return (
        <Stack
            sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                bgcolor: 'secondary.main'
            }}
        >
            {loading && <LinearProgress />}
            <Grid container direction='row' sx={{
                p: '10px 20px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography fontFamily='Paytone One'>mydailyNEWS</Typography>
                <Paper component='form' onSubmit={handleSearch} sx={{ p: '0 4px', display: 'flex', alignItems: 'center', width: '40%' }}>
                    <InputBase
                        id='search'
                        sx={{ ml: 1, flex: 1 }}
                        placeholder='Search News'
                        value={searchTerm}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Tooltip title='Search'>
                        <IconButton type='submit' sx={{ p: '10px' }}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Paper>
                <Grid sx={{ display: 'flex', alignItems: 'center', }}>
                    <Chip
                        label={user}
                        sx={{ mr: '20px', color: 'inherit', bgcolor: 'primary.main' }}
                        avatar={<Avatar sx={{ bgcolor: 'primary.light' }}>{user[0]}</Avatar>} />
                    <Tooltip title='Logout'>
                        <IconButton onClick={handleLogout}
                            sx={{ color: 'inherit', bgcolor: 'primary.main' }}
                        >
                            <Logout sx={{ fontSize: '16px' }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Stack>

    );
};

export default Header;
