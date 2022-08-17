import { useEffect, useState } from 'react';
import AccountLayout from 'components/layout/Account';
import Image from 'next/image';
import { useAuth } from 'store/hook';
import axios from 'core/utils/axios';
import { useDispatch } from 'react-redux';
import { login } from 'slices/authSlice';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import cn from 'classnames';
import Link from 'next/link';

const Settings = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { user_name, user_email } = auth;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isChanging, setChanging] = useState(false);

  useEffect(() => {
    setName(user_name ?? '');
    setEmail(user_email ?? '');
  }, [user_name, user_email]);

  const changeName = async () => {
    setChanging(true);
    try{
      const res = await axios.post('user/update-username', {
        username: name
      }) as any;
      if(res.error_code == 0) {
        dispatch(login({ ...auth, user_name: name}));
        toast.success('Successfully changed');
      }
      console.log(res);
    } catch(e) {
      if(e.response.status == 400) {
        toast.error(e.response.data.msg);
      }
    }
    setChanging(false);
  }

  return (
    <AccountLayout title='Account Settings' submenu={[]} >
      <div className='ml-[18px]'>
        <div>
          <div className='flex ml-[3px] mt-[106px] text-white text-20px items-center'>
            <Image src='/images/account/settings/name.svg' width='33' height='33' />
            <span className='pl-[17px] font-segoe-bold'>Name</span>
          </div>
          <div className='flex mt-[18px]' >
            <input className='w-[436px] h-[43px] bg-[#051E24] rounded-[9px] text-white text-[17px] outline-none px-[21px]' 
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className='relative ml-[7px]'>
              <button 
                className={cn('w-[138px] h-[43px] rounded-[9px] text-[14px]', 
                  isChanging ? 'bg-[#575A5B] text-white' : 'bg-[#FFD943]')
                }
                onClick={changeName}
                disabled={isChanging}
              >
                Change Name
              </button>
              <ClipLoader color={'#08222a'} loading={isChanging} size={30} cssOverride={{position: 'absolute'}} className='top-[7px] left-[50px]' />
            </div>
          </div>
        </div>
        <div>
          <div className='flex ml-[3px] mt-[34px] text-white text-20px items-center'>
            <Image src='/images/account/settings/email.svg' width='33' height='33' />
            <span className='pl-[17px] font-segoe-bold'>Email Address</span>
          </div>
          <div className={cn('flex mt-[18px] items-center h-[43px] rounded-[9px] text-white', auth.is_verify ? 'bg-[#051E24] w-[580px] justify-between ': '')} >
            <input className={cn('outline-none px-[21px] text-[17px] h-[43px]', auth.is_verify ? 'grow bg-transparent' : 'w-[436px] bg-[#051E24] rounded-[9px]')}
              value={email}
              onChange={e => setEmail(e.target.value)}            
              readOnly
            />
            {
              auth.is_verify 
                ?
                <div className='flex items-center text-white text-[12px] pr-[22px]'>
                  <Image src='/images/account/settings/verified.svg' width='16' height='16' />
                  <span className='pl-[12px]'>Verified</span>
                </div>
                :
                <div className='relative ml-[7px]'>
                  <Link href='/auth/email'>
                    <button 
                      className={cn('w-[138px] h-[43px] bg-[#ce454f] rounded-[9px] text-white text-[14px]')}
                    >
                        Link Email
                    </button>
                  </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}

export default Settings;