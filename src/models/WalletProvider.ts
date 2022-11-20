import { PublicKey, Transaction, SendOptions } from '@solana/web3.js';

type DisplayEncoding = 'utf8' | 'hex';

type WalletEvent = 'connect' | 'disconnect' | 'accountChanged';

type WalletRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signAndSendTransaction'
  | 'signTransaction'
  | 'signAllTransactions'
  | 'signMessage';

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface WalletProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction,
    opts?: SendOptions
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (message: Uint8Array | string, display?: DisplayEncoding) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: WalletEvent, handler: (args: any) => void) => void;
  request: (method: WalletRequestMethod, params: any) => Promise<unknown>;
}

export type Status = 'success' | 'warning' | 'error' | 'info';

export interface TLog {
  status: Status;
  method?: WalletRequestMethod | Extract<WalletEvent, 'accountChanged'>;
  message: string;
  messageTwo?: string;
}