import React from 'react';
import logo from './logo.svg';

function App() {
  const [message, setMessage] = React.useState('Hello World');
  return (
    <div className="bg-white">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold underline">
          {process.env.REACT_APP_KAKAO_API_KEY}
        </h1>
      </div>
    </div>
  );
}

export default App;
