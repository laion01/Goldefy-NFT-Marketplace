import { useEffect, useState } from "react";
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import { ClipLoader } from 'react-spinners'
import { useUtil } from "store/hook";

export default function Layout({children}) {
  const { isOverlay, isSpinner } = useUtil();
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='mt-[67px]'></div>
      <Header/>
      { children }
      <Footer />
      { isSpinner &&
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <ClipLoader speedMultiplier={0.5} color='white' size={50}/>
        </div>
      }
      {
        isOverlay &&
        <div className='fixed w-screen h-screen top-0 left-0 bg-[#00000070] z-20'>
        </div>
      }
    </div>
  );
}
