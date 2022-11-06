import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import CreatePage from './Pages/CreateLetterPage'
import GiftPage from './Pages/GiftRecommendPage'
import DecoratePage from './Pages/DecorateLetterPage'


function App() {
  return (
    <Routes>
      <Route path='/main' element={<MainPage></MainPage>}>  </Route>
      <Route path="/" element={<Navigate replace to={"/main"} />} />
      <Route path="/create" element={<CreatePage></CreatePage>} > </Route>
      <Route path="/gift" element={<GiftPage></GiftPage>} > </Route>
      <Route path="/decorate" element={<DecoratePage></DecoratePage>} > </Route>
    </Routes>
  );
}

export default App;
