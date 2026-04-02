// services/walletService.ts
// Clarix — Web3 Wallet Connection (MetaMask only, WalletConnect coming soon)

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

export async function connectWalletConnect(): Promise<WalletState> {
  throw {
    code: 'COMING_SOON',
    message: 'WalletConnect not yet installed',
    userMessage: 'WalletConnect mobile support is coming soon. Please use MetaMask for now.',
  } as WalletError;
}

export async function disconnectWallet(): Promise<void> {}

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
