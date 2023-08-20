import React from 'react';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Dropzone from './components/Dropzone'; // Import the Dropzone component
import './App.css';


const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero />
        <Dropzone />
        {/* <Demo />Add the Dropzone component here */}
      </div>
    </main>
  );
};

export default App;
