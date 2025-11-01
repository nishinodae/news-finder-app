import { Snackbar, SnackbarContent } from '@mui/material';
import { useNewsContext } from '../context/NewsContext';

const CustomSnackbar = () => {
    const { errorMessage, setError, searchTerm } = useNewsContext();

    return errorMessage === '' ?
        <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <SnackbarContent
                sx={{ bgcolor: 'primary.main' }}
                message={searchTerm === '' ? 'Search something to start.' : 'Press Enter or click Search Icon once you are done'}
            />
        </Snackbar>
        : <Snackbar
            open={errorMessage === 'No result found.'}
            onClose={() => setError('')}
            message={errorMessage}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />;

};

export default CustomSnackbar;