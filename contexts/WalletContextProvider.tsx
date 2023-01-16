import React from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { WalletError, WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { CoinbaseWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo, FC, useCallback, ReactNode} from 'react'
import { clusterApiUrl } from '@solana/web3.js'

const WalletContextProvider : FC<{children: ReactNode}> = ({children}) => {
    const handleLogOut = async () => {
        const fetchRes = await fetch('/api/auth/logout', {
            method: 'DELETE'
        })
        return
    }
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network),[network])
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter()
    ], []);
    const onError = useCallback( async (error: WalletError) => {
        switch(error.error.code){
            case 4001:
                await handleLogOut()
                break;
        }
        console.error(error.error.code);
    }, []);
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider