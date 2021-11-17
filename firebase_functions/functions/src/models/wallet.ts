export interface Wallet {
  address: string;
  seed: string;
  balance: number;
}

export interface InitializedWallet {
  messageId: string;
  wallet: Wallet;
}

export interface BalanceOnlyWallet {
  messageId: string;
  wallet: { balance: number };
}
