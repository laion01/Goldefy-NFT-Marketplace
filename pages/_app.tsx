import NextApp from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Auth from 'components/Auth';
import Layout from 'components/layout/Layout';
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from "ethers";

import 'react-toastify/dist/ReactToastify.css';

import "../styles/globals.css";
// import "../styles/goldefy.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};
export default class App extends NextApp {
  // remove it here
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Head>
        </Head>
        <ToastContainer theme={'dark'} />
        <Web3ReactProvider
          getLibrary={getLibrary}
        >
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        </Web3ReactProvider>
      </Provider>
    );
  }
}