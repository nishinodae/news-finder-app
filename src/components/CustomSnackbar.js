import { Box, Paper, Snackbar } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';

const CustomSnackbar = ({ typingValue }) => {
    const { errorMessage, setError } = useNewsContext();

    return <Box
        sx={{
            position: 'fixed',
            bottom: '20px',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'none'
        }}>
        {!errorMessage &&
            <Paper sx={{ bgcolor: 'primary.main', color: '#fff', display: 'inline-block', p: '15px' }}>
                {typingValue === '' ? 'Search something to start' : 'Press Enter or click Search Icon once you are done'}
            </Paper>
        }
        <Snackbar
            open={errorMessage}
            onClose={() => setError('')}
            message={errorMessage}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    </Box>;
};

export default CustomSnackbar;
