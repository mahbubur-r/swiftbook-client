import React from 'react';
import logo from '../assets/logo.png'
const Logo = () => {
    return (
        <div className='w-65 h-15 flex items-center justify-center'    >
            <img src={logo} alt="" className='w-20 h-20 rounded-full' />
            <p className="text-4xl font-bold text-primary">SwiftBook</p>
        </div>
    )
};

export default Logo;