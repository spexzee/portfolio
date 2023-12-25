import { motion } from 'framer-motion';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  const handleClickResume=()=>{
    window.open('https://drive.google.com/file/d/149dgFb0tSNVt4H-UDjFS0DCBfyJZ6mlp/view?usp=drive_link');
  }
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Spexzee</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am a passionate Front-End React Developer, from <br className='sm:block hidden' />
            Bengaluru 📍
          </p>
          <button class="button-resume mt-20 bg-violet-500" role="button" onClick={handleClickResume}><span class="text">Resume</span><span></span></button>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
