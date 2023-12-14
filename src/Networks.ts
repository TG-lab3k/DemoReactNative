import {NativeModules} from 'react-native';

const {HPOSNetworks} = NativeModules;
const Networks = HPOSNetworks;
export interface NetworkState {
  ip4?: string;
}

export interface NetworkInterface {
  getNetworkState(): Promise<NetworkState>;
}

export default Networks as NetworkInterface;
