import React from "react";
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>

      </nav>

      <h1 className='head_text'>
      <span className='orange_gradient '>BIZ AI</span><br className='max-md:hidden' /><br className='max-md:hidden' />
      Your virtual database assistant <br className='max-md:hidden' />
        
      </h1>
      <h2 className='desc'>
      Upload your excel file and I'll learn it in seconds 🙌
      </h2>
    </header>
  );
};

export default Hero;