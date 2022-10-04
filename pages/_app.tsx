import '../styles/globals.css'
import React from 'react';
import type { AppProps } from 'next/app'
import WalletContextProvider from '../contexts/WalletContextProvider';
import NavBar from '../components/navbar/NavBar';
require('@solana/wallet-adapter-react-ui/styles.css');



function MyApp({ Component, pageProps }: AppProps) {

  return(
    <WalletContextProvider>
      <NavBar/>
      <Component {...pageProps}/>
    </WalletContextProvider>
    ) 
}

export default MyApp
