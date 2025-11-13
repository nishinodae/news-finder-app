import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewsContextProvider } from './context/NewsContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';
import { lazy } from 'react';

const Login = lazy(() => import('./components/Login'));
const Home = lazy(() => import('./components/Home'));

function App() {
  return (
    <><ThemeProvider theme={theme}>
        <Router>
          <NewsContextProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
            </Routes>
          </NewsContextProvider>
        </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
