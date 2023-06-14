import React from 'react';
import HeaderHomePage from '../../components/homePageHeader';
import Footer from './../../components/footer/index';

function HomePageLayout({ children }) {
    return (
    <div className='flex flex-col mt-[56px]'>
        <HeaderHomePage/>
        <div>{children}</div>
        <Footer/>
    </div>)
}

export default HomePageLayout;