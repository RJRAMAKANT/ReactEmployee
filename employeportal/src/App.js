import logo from './logo.svg';
import './App.css';
import RegistrationForm from './LandingPage/RegistrationForm ';
import FirstPage from './LandingPage/FirstPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingPage from './LandingPage/LoadingPage';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 


    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage className='h-full w-full dark:bg-gray-950 ' />; 
  }

  return <Router>
  <Routes>
    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/" element={<FirstPage/>} />
  </Routes>
</Router>
    
}

export default App;
