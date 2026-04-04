// services/walletService.ts
// Clarix — Web3 Wallet Connection (MetaMask + WalletConnect + Coinbase)

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { BrowserProvider, formatEther } from 'ethers';

export interface WalletState {
  address: string;
  chainId: number;
  chainName: string;
  balance: string;
  balanceUSD: number;
  provider: 'metamask' | 'walletconnect' | 'coinbase';
  isConnected: boolean;
}

export interface WalletError {
  code: string;
  message: string;
  userMessage: string;
}

const SUPPORTED_CHAINS: Record<number, string> = {
  1: 'Ethereum Mainnet',
  137: 'Polygon',
  42161: 'Arbitrum One',
  8453: 'Base',
  56: 'BNB Chain',
  10: 'Optimism',
};

export function getChainName(chainId: number): string {
  return SUPPORTED_CHAINS[chainId] || `Chain ${chainId}`;
}

function hexToEth(hexBalance: string): string {
  const wei = parseInt(hexBalance, 16);
  const eth = wei / 1e18;
  return eth.toFixed(4);
}

// ─── WalletConnect modal (lazy singleton) ─────────────────────────────────────

const WC_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '1b3dd0a597c4caa18ac4a366b63aa52c';

type Web3Modal = ReturnType<typeof createWeb3Modal>;
let wcModal: Web3Modal | null = null;

function getWcModal(): Web3Modal {
  if (wcModal) return wcModal;

  wcModal = createWeb3Modal({
    ethersConfig: defaultConfig({
      metadata: {
        name: 'Clarix Protocol',
        description: 'Crypto Intelligence, Made Clear',
        url: 'https://clarixprotocol.com',
        icons: ['https://clarixprotocol.com/favicon.ico'],
      },
      enableEIP6963: true,
      enableInjected: false,
      enableCoinbase: false,
    }),
    chains: [
      { chainId: 1,     name: 'Ethereum Mainnet', currency: 'ETH',  explorerUrl: 'https://etherscan.io',           rpcUrl: 'https://cloudflare-eth.com' },
      { chainId: 137,   name: 'Polygon',           currency: 'MATIC',explorerUrl: 'https://polygonscan.com',        rpcUrl: 'https://polygon-rpc.com' },
      { chainId: 42161, name: 'Arbitrum One',       currency: 'ETH',  explorerUrl: 'https://arbiscan.io',            rpcUrl: 'https://arb1.arbitrum.io/rpc' },
      { chainId: 8453,  name: 'Base',               currency: 'ETH',  explorerUrl: 'https://basescan.org',           rpcUrl: 'https://mainnet.base.org' },
      { chainId: 56,    name: 'BNB Chain',          currency: 'BNB',  explorerUrl: 'https://bscscan.com',            rpcUrl: 'https://bsc-dataseed.binance.org' },
      { chainId: 10,    name: 'Optimism',           currency: 'ETH',  explorerUrl: 'https://optimistic.etherscan.io',rpcUrl: 'https://mainnet.optimism.io' },
    ],
    projectId: WC_PROJECT_ID,
  });

  return wcModal;
}

// ─── MetaMask ─────────────────────────────────────────────────────────────────

export async function connectMetaMask(): Promise<WalletState> {
  if (typeof window.ethereum === 'undefined') {
    throw {
      code: 'NO_METAMASK',
      message: 'MetaMask not installed',
      userMessage: 'MetaMask is not installed. Please install it from metamask.io.',
    } as WalletError;
  }

  try {
    const accounts: string[] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw {
        code: 'NO_ACCOUNTS',
        message: 'No accounts returned',
        userMessage: 'No accounts found. Please unlock your MetaMask wallet.',
      } as WalletError;
    }

    const address = accounts[0];
    const chainIdHex: string = await window.ethereum.request({ method: 'eth_chainId' });
    const chainId = parseInt(chainIdHex, 16);
    const balanceHex: string = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return {
      address,
      chainId,
      chainName: getChainName(chainId),
      balance: hexToEth(balanceHex),
      balanceUSD: 0,
      provider: 'metamask',
      isConnected: true,
    };
  } catch (err: any) {
    if (err.code === 4001 || err.message?.includes('User rejected')) {
      throw {
        code: 'USER_REJECTED',
        message: 'User rejected connection',
        userMessage: 'You cancelled the wallet connection. Try again when ready.',
      } as WalletError;
    }
    if (err.code && err.userMessage) throw err;
    throw {
      code: 'CONNECTION_FAILED',
      message: err.message || 'Unknown error',
      userMessage: 'Failed to connect wallet. Please try again.',
    } as WalletError;
  }
}

// ─── WalletConnect ────────────────────────────────────────────────────────────

export async function connectWalletConnect(): Promise<WalletState> {
  const modal = getWcModal();

  return new Promise((resolve, reject) => {
    let settled = false;
    let modalHasOpened = false;

    const unsubscribeProvider = modal.subscribeProvider(async ({ address, chainId, isConnected }: any) => {
      if (!modalHasOpened || settled || !isConnected || !address) return;
      settled = true;
      unsubscribeProvider();

      const resolvedChainId: number = chainId ?? 1;
      try {
        const rawProvider = modal.getWalletProvider();
        const ethersProvider = new BrowserProvider(rawProvider as any);
        const balanceBn = await ethersProvider.getBalance(address);
        resolve({
          address,
          chainId: resolvedChainId,
          chainName: getChainName(resolvedChainId),
          balance: parseFloat(formatEther(balanceBn)).toFixed(4),
          balanceUSD: 0,
          provider: 'walletconnect',
          isConnected: true,
        });
      } catch {
        resolve({
          address,
          chainId: resolvedChainId,
          chainName: getChainName(resolvedChainId),
          balance: '0.0000',
          balanceUSD: 0,
          provider: 'walletconnect',
          isConnected: true,
        });
      }
    });

    const unsubscribeState = modal.subscribeState(({ open }: any) => {
      if (open) {
        modalHasOpened = true;
        return;
      }
      // Modal closed — if already connected, subscribeProvider will resolve
      if (modalHasOpened && !settled && !modal.getIsConnected()) {
        settled = true;
        unsubscribeProvider();
        unsubscribeState();
        reject({
          code: 'USER_CANCELLED',
          message: 'WalletConnect modal closed without connecting',
          userMessage: 'Connection cancelled. Please try again.',
        } as WalletError);
      }
    });

    modal.open().catch((err: any) => {
      if (!settled) {
        settled = true;
        unsubscribeProvider();
        unsubscribeState();
        reject({
          code: 'MODAL_ERROR',
          message: err?.message ?? 'Failed to open WalletConnect modal',
          userMessage: 'Failed to open WalletConnect. Please try again.',
        } as WalletError);
      }
    });
  });
}

// ─── Coinbase Wallet ──────────────────────────────────────────────────────────

type CbProvider = ReturnType<InstanceType<typeof CoinbaseWalletSDK>['makeWeb3Provider']>;
let cbProvider: CbProvider | null = null;

function getCbProvider(): CbProvider {
  if (cbProvider) return cbProvider;
  const sdk = new CoinbaseWalletSDK({
    appName: 'Clarix Protocol',
    appChainIds: [1, 8453, 137, 42161, 10, 56],
  });
  cbProvider = sdk.makeWeb3Provider();
  return cbProvider;
}

export async function connectCoinbase(): Promise<WalletState> {
  try {
    const provider = getCbProvider();
    const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];

    if (!accounts || accounts.length === 0) {
      throw {
        code: 'NO_ACCOUNTS',
        message: 'No accounts returned',
        userMessage: 'No accounts found. Please unlock your Coinbase Wallet.',
      } as WalletError;
    }

    const address = accounts[0];
    const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
    const chainId = parseInt(chainIdHex, 16);

    let balance = '0.0000';
    try {
      const balanceHex = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      }) as string;
      balance = hexToEth(balanceHex);
    } catch { /* non-critical */ }

    return {
      address,
      chainId,
      chainName: getChainName(chainId),
      balance,
      balanceUSD: 0,
      provider: 'coinbase',
      isConnected: true,
    };
  } catch (err: any) {
    if (err.code === 4001 || err.message?.includes('User rejected') || err.message?.includes('cancelled')) {
      throw {
        code: 'USER_REJECTED',
        message: 'User rejected connection',
        userMessage: 'You cancelled the Coinbase Wallet connection. Try again when ready.',
      } as WalletError;
    }
    if (err.code && err.userMessage) throw err;
    throw {
      code: 'CONNECTION_FAILED',
      message: err.message || 'Unknown error',
      userMessage: 'Failed to connect Coinbase Wallet. Please try again.',
    } as WalletError;
  }
}

// ─── Disconnect ───────────────────────────────────────────────────────────────

export async function disconnectWallet(): Promise<void> {
  if (wcModal) {
    try { await wcModal.disconnect(); } catch { /* ignore */ }
  }
  if (cbProvider) {
    try { await cbProvider.disconnect(); } catch { /* ignore */ }
  }
}

// ─── MetaMask event watchers ──────────────────────────────────────────────────

export function watchWalletChanges(
  onAccountChange: (address: string) => void,
  onChainChange: (chainId: number) => void,
  onDisconnect: () => void
): () => void {
  if (typeof window.ethereum === 'undefined') return () => {};

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) onDisconnect();
    else onAccountChange(accounts[0]);
  };

  const handleChainChanged = (chainIdHex: string) => {
    onChainChange(parseInt(chainIdHex, 16));
  };

  window.ethereum.on('accountsChanged', handleAccountsChanged);
  window.ethereum.on('chainChanged', handleChainChanged);
  window.ethereum.on('disconnect', onDisconnect);

  return () => {
    window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum?.removeListener('chainChanged', handleChainChanged);
    window.ethereum?.removeListener('disconnect', onDisconnect);
  };
}

export async function checkExistingConnection(): Promise<string | null> {
  if (typeof window.ethereum === 'undefined') return null;
  try {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch {
    return null;
  }
}
