import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import GoBack from 'components/buttons/GoBack';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';

import { InjectedConnector } from "@web3-react/injected-connector";

import Axios from "core/utils/axios";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from 'store/slices/authSlice';

const metamask = new InjectedConnector({
  supportedChainIds: [4]
});


export default function Wallet(props) {
    const {
        library,
        account,
        activate,
        setError
      } = useWeb3React();

    const dispatch = useDispatch();
    
    const router = useRouter();

    const [isConnecting, setConnecting] = useState(false);
    
    const connect_wallet = async () => {
        console.log('connect wallet');
        setConnecting(true);
        await activate(metamask, async (error) => {
          if(error.name == 'UnsupportedChainIdError') {
            switch_network();
          }
        });
    }

    useEffect(() => {
      if(!account) return;
      setConnecting(true);
      sign_message()
        .then(() => setConnecting(false))
        .catch(() => setConnecting(false))
    }, [account]);


    const switch_network = async () => {
      const provider = await metamask.getProvider();
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: '0x4' }]
        });
        setTimeout(sign_message, 1000);
      } catch (switchError) {
        console.log('switchError', switchError, JSON.stringify(switchError, null, '\t'));
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: ['0x4']
            });
          } catch (error) {
          }
        }
      }
      setConnecting(false);
    };

    const sign_message = async () => {
      console.log(account);
      const res = await Axios.get('auth/connect', {
          params: {
            public_address: account
          }
        });
      let message = 
      `Welcome to GoldeFy!
This request will not trigger a blockchain transaction or cost any gas fees.
Your authentication status will reset after 24 hours.
Wallet address:${account}
Nonce:${res.data.nonce}`;
      if (!library) return;
      let signature;
      try {
          signature = await library.provider.request({
              method: "personal_sign",
              params: [message, account]
          });
          
      } catch (error) {
          setError(error);
          return;
      }
      const ret = await Axios.post('auth', {
          public_address: account,
          signature: signature
        });
      if(ret && ret['error_code'] == 0) {
          dispatch(
            login({
              wallet: account, 
              token: ret.data.accessToken, 
              user_id: res.data.user_id,
              user_name: res.data.user_name,
              user_email: res.data.user_email,
              is_verify: res.data.is_verify,
              nonce: res.data.nonce
            }));
          if(res.data.is_verify)
            router.replace('/');
          else
            router.replace('/auth/email');
      }
    }

    return (
        <div className={cn('flex grow items-center', styles.container)}>
            <div className='flex flex-row items-center justify-center w-full h-[348px] bg-[#02222A]'>
                <div className='relative flex flex-col items-center mt-[42px] mb-[39px]'>
                    <div className='text-[29px] text-white'>
                        Login or Create an account
                    </div>
                    <div className='text-[12px] text-[#586A7D] mt-[7px]'>
                        Connect with one of our available wallet providers or create a new one
                    </div>
                    <div className='flex flex-row items-center h-[61px] w-[428px] border border-[#43F3FF] rounded-[9px] mt-7 cursor-pointer'
                        onClick={connect_wallet}
                    >
                        <div className='ml-[17px]'>
                          <Image alt='' src='/images/metmask.png' width='36' height='36' />
                        </div>
                        <div className='grow text-[15px] text-white ml-[16px]'>
                            Metamask
                        </div>
                        <div className='text-[12px] text-[#586A7D] mr-[27px]'>
                            { isConnecting ? 'Connecting ...' : 'Connect' }
                        </div>
                    </div>
                    <div className='mt-[42px]'>
                      <Image alt='' src='/images/connectDivider.png' width='233' height='6' />
                    </div>
                    <div className='mt-[22px] text-[12px] text-[#586A7D]'>
                        We do not own your private keys and cannot access your funds without your confirmation.
                    </div>
                    <div className='mt-[12px] text-[14px] text-[#55E3EE]'>
                        See term of use
                    </div>
                    <GoBack className='-left-[117px] -top-[7px]'/>
                </div>
            </div>
        </div>
        
    )
} 