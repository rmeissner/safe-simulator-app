import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';

const appsSdk = new SafeAppsSDK();

const sleep = <T>(timeout: number, value?: T) => new Promise<T | undefined>((cb) => setTimeout(() => cb(value), timeout))

export const checkIsSafeApp = async(): Promise<boolean> => {
    const safeInfo = await Promise.any([appsSdk.safe.getInfo(), sleep(1000, false)])
    return safeInfo !== false
}

export const getSafeInfo = (): Promise<SafeInfo> => {
    return appsSdk.safe.getInfo()
}

export const getChainId = async(): Promise<number> => {
    return (await getSafeInfo()).chainId
}

export const safeAppsProvider = (chainId: string) => {
    return new SafeAppProvider({ safeAddress: "", chainId: parseInt(chainId), threshold: 0, owners: [] }, appsSdk)
}