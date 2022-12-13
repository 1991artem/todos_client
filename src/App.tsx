import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Routers from './components/routers';


function App() {
  const navigate = useNavigate();
  
  useEffect(()=> {
    const storage = localStorage.getItem('user');
    if(storage) {
      navigate('/todos')
    }
  }, [])
  return (
    <>
      <Header/>
      <Routers />
      <Footer />
    </>

  );
}

export default App;
