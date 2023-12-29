import React from 'react';
import { FiInstagram, FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <div className='bg-black-100 h-[7em] flex justify-evenly flex-col align-middle'>
            <div className="copyright">
                <p className="text-white text-center mt-4">&copy; 2024 Spexzee. All rights reserved</p>
            </div>
            <div className="flex gap-6 justify-center">
                <FiInstagram fontSize={27} className='cursor-pointer' onClick={() => {
                    window.open("https://www.instagram.com/abuuuuu.___", "_blank");
                }} />
                <FiGithub fontSize={27} className='cursor-pointer' onClick={() => {
                    window.open("https://www.github.com/spexzee/", "_blank");
                }} />
                <FiLinkedin fontSize={27} className='cursor-pointer' onClick={() => {
                    window.open("https://www.linkedin.com/in/abubakara-nadafa-a12b53169/", "_blank");
                }} />
            </div>
        </div>
    )
}

export default Footer
