import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, useAuth } from 'store/hook';
import { login, logout } from 'slices/authSlice';
import { useWeb3React } from '@web3-react/core';

import { InjectedConnector } from "@web3-react/injected-connector";

const metamask = new InjectedConnector({
  supportedChainIds: [97]
});


function validateToken(token) {
  if(token)
    return true;
}

const Auth = (props) => {

  const dispatch = useAppDispatch();
  const { logined, wallet, token } = useAuth();
  const { activate } = useWeb3React();
  const router = useRouter();

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    let auth = {} as any;
    if(localStorage.getItem('auth'))
      auth = JSON.parse(localStorage.getItem('auth'));
    if(token == '') {
        if(validateToken(storageToken)){
          activate(metamask);
          dispatch(login(auth));
          return;
        }
        if(router.pathname.includes('/account')){
          dispatch(logout());
          router.replace('/auth/wallet');
          return;
        }
    }
    else if( wallet != auth.wallet || storageToken != token || !validateToken(token)) {
        dispatch(logout());
    }
  }, [logined, token, wallet, router.pathname])

  return (
      <>
        { props.children }
      </>
  )
};
export default Auth;
