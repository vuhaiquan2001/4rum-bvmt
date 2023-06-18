import React, {memo} from 'react';
import { useStore } from '../../store';
import Header from './../../components/header/index';
import Footer from './../../components/footer/index';

function DefaultLayout({ children }) {
    const {state,} = useStore()
    
    return (
    <div className='flex flex-col mt-[56px]'>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </div>)
}

export default memo(DefaultLayout);
