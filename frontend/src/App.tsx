import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import CreatePage from './Pages/CreateLetterPage'
import GiftPage from './Pages/GiftRecommendPage'
import DecoratePage from './Pages/DecorateLetterPage'
import CalendarPage from './Pages/CalendarPage';
import LoginPage from './Pages/LoginPage';


function App() {
  return (
    <Routes>
      <Route path='/main' element={<MainPage></MainPage>}>  </Route>
      <Route path="/" element={<Navigate replace to={"/main"} />} />
      <Route path="/calendar" element={<CalendarPage></CalendarPage>}></Route>
      <Route path="/create" element={<CreatePage></CreatePage>} > </Route>
      <Route path="/gift" element={<GiftPage></GiftPage>} > </Route>
      <Route path="/decorate" element={<DecoratePage></DecoratePage>} > </Route>
      <Route path="/login" element={<LoginPage></LoginPage>} > </Route>

    </Routes>
  );
}

export default App;
