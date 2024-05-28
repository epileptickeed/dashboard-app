import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { components } from '../../data/components.tsx';
import Aside from '../components/Aside.tsx';
import { Route, Routes } from 'react-router-dom';
import Index from './Table/Index.tsx';
import Graph from './Graph/Graph.tsx';
import { tableContent } from '../../data/tableContent.tsx';
import { useState } from 'react';

const Home = () => {
  const currentVisibleComponent = useSelector(
    (state: RootState) => state.component.currentVisibleComponent,
  );

  return (
    <div className="home">
      <Aside />
    </div>
  );
};

export default Home;
