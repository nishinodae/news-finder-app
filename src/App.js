import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { NewsContextProvider } from './context/NewsContext';

function App() {
  return (
    <>
      <Router>
        <NewsContextProvider>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
          </Routes>
        </NewsContextProvider>
      </Router>

    </>
  );
}

export default App;
