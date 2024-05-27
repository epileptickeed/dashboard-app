import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Aside from './components/Aside';
import Home from './pages/Home';
import User from './pages/User/User';
import Index from './pages/Table/Index';
import Graph from './pages/Graph/Graph';
import { useState } from 'react';
import { tableContent } from '../data/tableContent';

function App() {
  const [data, setData] = useState({
    labels: tableContent.map((item) => item.category),
    datasets: [
      {
        label: 'Users Gained',
        data: tableContent.map((item) => item.sum),
      },
    ],
  });
  return (
    <main>
      <Aside />

      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/table" element={<Index />} />
        <Route path="/graph" element={<Graph chartData={data} />} />
      </Routes>
    </main>
  );
}

export default App;
