import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { logout } from 'slices/authSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from "next/image";
import { copy2Clipboard, truncateAddress } from 'utils';
import { useAuth } from 'store/hook';
import { useWeb3React } from '@web3-react/core';
import { dropdown_menu } from './data';

export default function DropdownMenu({ opened, onClose }){
    const ref = useRef<HTMLDivElement>()
    const dispatch = useDispatch();

    const { deactivate } = useWeb3React();
    const { user_name, wallet } = useAuth();
    
    useEffect(() => {
        if(!ref?.current) return;
        const handleClickOutside = (event) => {
            if (opened && (ref.current && !ref.current?.contains(event.target))) {
                onClose();
            }
        }
        setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [ref, opened, onClose])

    return (
        <div
            ref={ref} 
            className={cn('absolute flex flex-col px-4 right-[44px] top-[77px] w-[220px] h-[365px] bg-[#02353A] border border-[#14959E] rounded-[13px] shadow-[0_3px_6px_#0000008f] transition-transform', !opened && 'w-0 h-0 hidden')}>
            <div className='text-[17px] text-[#43F3FF] pt-[19px]'>
                { user_name ? user_name : 'Unnamed' }
            </div>
            <div className='flex flex-row items-center justify-between text-[11px] text-[#DBDBDB] pt-1'>
                { truncateAddress(wallet) }
                <Image width='11' height='13' alt='' 
                    src='/images/copy.png' className='cursor-pointer'
                    onClick={() => copy2Clipboard(wallet)}
                />
            </div>
            <div className='text-white text-[11px] pt-[10px]'>
                Balance
            </div>
            <div className='flex flex-row px-2 items-center justify-between h-[50px] w-[187px] bg-[#02222A] rounded-[4px] mt-[6px]'>
                <Image width='35' height='35' alt='' src='/images/g1.png' />
                <div className='flex flex-col items-end mr-[6px]'>
                    <div className='text-[14px]'>
                        0 $GOD
                    </div>
                    <div className='text-[#0F919E] text-[10px] mt-[3px]'>
                        0 USD
                    </div>
                </div>
            </div>
            <div className='mt-4 flex flex-col'>
                {
                    dropdown_menu.map((menu, key) => (
                        <Link href={menu.path} key={key} >
                            <button
                                className='bg-[#052D37] mb-[5px] h-[31px] cursor-pointer'
                                onClick={onClose}
                            >
                                {menu.title}
                            </button>
                        </Link>
                    ))
                }
                <div className='flex items-end justify-center h-[29px] text-[#FF2B2B] border-[#14959E] border-t mt-[15px] cursor-pointer'
                    onClick={() => { deactivate(); dispatch(logout()); onClose();}}
                >
                    Logout
                </div>
            </div>

        </div>
    )
}