import React from 'react';
import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import CreatePage from './Pages/CreateLetterPage'
import GiftPage from './Pages/GiftRecommendPage'
import DecoratePage from './Pages/DecorateLetterPage'


function App() {
  const [message, setMessage] = React.useState('Hello World');
  return (
<<<<<<< HEAD
    <Routes>
    <Route path='/main' element={<MainPage></MainPage>}>  </Route>  
    <Route path="/" element={<Navigate replace to={"/main"} />} />
    <Route path="/create" element={<CreatePage></CreatePage>} > </Route>
    <Route path="/gift" element={<GiftPage></GiftPage>} > </Route> 
    <Route path="/decorate" element={<DecoratePage></DecoratePage>} > </Route>   
    </Routes>
=======
    <div className="bg-white">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold underline">
          {process.env.REACT_APP_KAKAO_API_KEY}
        </h1>
      </div>
    </div>
>>>>>>> a6fd9a37b0850bd0c53dd114848aa73a3c140e2e
  );
}

export default App;
