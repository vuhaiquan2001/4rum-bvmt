import React, {memo, useEffect} from 'react';
import Header from './../../components/header/index';
import Footer from './../../components/footer/index';
import { useStore, action } from '../../store';
import BannedPage from '../../pages/BannedPage';
function DefaultLayout({ children }) {
  const [state, dispatch] = useStore()

    return (
    <div className='flex flex-col mt-[56px]'>
        <Header/>
        {state.users.isban===1?<BannedPage dispatch={dispatch} action={action}/>:<div>{children}</div>}
        <Footer/>
    </div>)
}

export default memo(DefaultLayout);
