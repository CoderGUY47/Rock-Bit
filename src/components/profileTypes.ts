export type ProfileTab = 
  | 'profile'
  | 'referrals'
  | 'api_keys'
  | 'login_history'
  | '2fa'
  | 'change_password';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  nationality: string;
  gender: string;
  dob: string;
}

export interface FeatureStatus {
  depositAssets: boolean;
  withdrawAssets: boolean;
  cardPurchases: boolean;
  bankDeposit: boolean;
  fiatSpotWallet: boolean;
  marginWallet: boolean;
}
