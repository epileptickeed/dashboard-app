import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Aside from './components/Aside';
import Index from './pages/Table/Index';
import Graph from './pages/Graph/Graph';
import { useState } from 'react';
import { tableContent } from '../data/tableContent';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function App() {
  axios.defaults.baseURL = `http://localhost:4000`;
  axios.defaults.withCredentials = true;

  const [data, setData] = useState({
    labels: tableContent.map((item) => item.category),
    datasets: [
      {
        label: 'Users Gained',
        data: tableContent.map((item) => item.sum),
        backgroundColor: ['green', 'blue', 'red', 'purple', 'yellow'],
      },
    ],
  });
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<Index />} />
        <Route path="/graph" element={<Graph chartData={data} />} />
      </Routes>
    </>
  );
}

export default App;
