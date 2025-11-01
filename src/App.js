import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { NewsContextProvider } from './context/NewsContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';

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
