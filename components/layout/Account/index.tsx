import styles from './index.module.scss';
import cn from 'classnames';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from 'store/hook';
import { truncateAddress, copy2Clipboard } from 'utils';
import { dropdown_menu } from './data';

const AccountLayout = ({ title, submenu, children }) => {
  const router = useRouter();
  const { user_name, wallet } = useAuth();
  return (
    <div>
      <div className={cn('flex', styles.container)}>
        <div className='flex flex-row mt-[145px] justify-center grow bg-[#032C32] border-t-[2px] border-[#43F3FF]'>
          <div className='-mt-[102px] h-[671px] flex flex-col justify-center items-center'>
            <div className='text-[30px] text-white mb-[15px] font-bold'>
              { title }
            </div>
            <div className='w-[297px] h-[611px] bg-[#0A414E] rounded-[21px] px-[24px]'>
              <div className='flex items-center justify-center w-[248px] h-[207px] bg-[#032C32] rounded-[20px] mt-[29px]'>
                <Image alt='' src='/images/charAvartar/c1.png' width='171px' height='157px' />
              </div>
              <div className='text-[#43F3FF] mt-6 ml-[10px]'>
                { user_name ? user_name : 'Unnamed' }
              </div>
              <div className='flex items-center justify-between text-[#DBDBDB] text-[11px] ml-[10px] mt-1'>
                { truncateAddress(wallet) }
                  <Image alt='' width='11px' height='13px' className='cursor-pointer'
                    src='/images/copy.png'
                    onClick={() => copy2Clipboard(wallet)}
                  />
              </div>
              <div className='flex flex-col mt-[45px]'>
                {
                  dropdown_menu.map((menu, key) => (
                    <Link href={menu.path} key={key}>
                      <button className={cn('text-white text-[18px] bg-[#052D37] rounded-[4px] h-[39px] mb-[7px]', router.pathname.includes(menu.path) && 'bg-[#176578]')}
                      >
                        { menu.title }
                      </button>
                      </Link>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-[26px] w-[865px] -mt-[40px]'>
            <div className='flex flex-row h-[38px] space-x-[20px]'>
              {
                submenu.map((menu, key) => (
                  <div key={key} 
                    className={cn('text-[#43F3FF] text-[17px] h-[38px] min-w-[116px] flex justify-center', router.asPath == menu.path && 'border-b-[5px] border-[#43F3FF]')}>
                    <Link href={menu.path}>
                      { menu.title }
                    </Link>
                  </div>
                ))
              }
            </div>
            <div className='min-h-[683px]'>
              {
                children
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AccountLayout;