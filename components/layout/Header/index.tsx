import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAuth } from "store/hook";
import DropdownMenu from './DropdownMenu';
import { nav_menu } from "./data";

const Header = ({}) => {
    const router = useRouter();
    const { logined, user_name } = useAuth();
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [menuOpened, openMenu] = useState(false);

    return (
    <header className={styles.header}>
        <nav className="flex top-nav px-1 py-1 h-full items-center pl-[29px]">
        <Image alt='' src='/images/logo.png' width='118' height='37' />
        <div className="hidden xl:flex items-center justify-between pl-16">
            {
                nav_menu.map(item => (
                <Link href={item.path} key={item.path} >
                    <button className={cn('outline-none px-3 w-[144px] h-[67px] text-[18px] font-euro-normal', item.path == router.pathname ? styles.active_menu : 'pt-2')}>
                        { item.text }
                    </button>
                </Link>
                ))
            }
        </div>
        <div className='flex justify-end grow px-0 xl:px-8'>
            <div className={cn('flex pr-2 cursor-pointer shrink-0', !logined && 'hidden')}
                onClick={() => setDropdownOpened(true)}
            >
                <Image alt='' src='/images/charAvartar/c1.png' width='51' height='45'/>
                <div className='flex items-center px-3'>
                    { user_name? user_name : 'Unnamed'}
                    <div className='relative ml-[11px] -mt-[3px]'>
                        <Image alt='' src='/images/arrow-down.png' width='9' height='6'/>
                    </div>
                </div>
            </div>
            <Link href='/auth/wallet'>
                <button className={cn('text-[16px] cursor-pointer w-[213px] h-[66px]', logined ? 'hidden': 'hidden xl:block', styles.connect_wallet)}>
                    Connect Wallet
                </button>
            </Link>
            <Link href='/auth/wallet'>
                <button className={cn('text-[16px] cursor-pointer  w-[100px] h-[40px] bg-[#3d99a3] rounded-[10px]', logined ? 'hidden' : 'block xl:hidden')}>
                    Connect
                </button>
            </Link>
            <button className='px-[20px] block xl:hidden'
                onClick={() => openMenu(!menuOpened)}
            >
                <Image src='/images/components/lines.svg' width='32' height='32' />
            </button>
            <div className={cn('block xl:hidden fixed w-screen h-screen left-0 top-[67px] bg-[#08222a]', !menuOpened && 'hidden')}>
                <div className='flex flex-col items-center mt-[60px]'>
                {
                    nav_menu.map(item => (
                    <Link href={item.path} key={item.path}>
                        <button className={cn('outline-none px-3 w-full h-[67px] text-[18px] font-euro-normal', item.path == router.pathname ? 'bg-[#0C4E53]' : 'pt-2')}
                            onClick={() => openMenu(false)}
                        >
                            { item.text }
                        </button>
                    </Link>
                    ))
                }
                </div>
            </div>
        </div>
        </nav>
        <DropdownMenu opened={dropdownOpened} onClose={() => setDropdownOpened(false)} />
    </header>
  );
}

export default Header