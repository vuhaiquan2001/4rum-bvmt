import React from 'react';
import Header from './../../components/header/index';
import Footer from './../../components/footer/index';

function DefaultLayout({ children }) {
    return (
    <div className='flex flex-col'>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </div>)
}

export default DefaultLayout;
