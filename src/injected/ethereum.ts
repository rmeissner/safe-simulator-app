import { ethers } from "ethers";

declare let window: any;

export const hasInjectedProvider = () => !!window.ethereum

export const eip1193Provider = (): ethers.providers.ExternalProvider => {
    return window.ethereum
}

let ethereumProvider: ethers.providers.Web3Provider | undefined = undefined
export const ethersProvider = () => {
    if (!ethereumProvider)
        ethereumProvider = new ethers.providers.Web3Provider(eip1193Provider())
    return ethereumProvider
}

export const getChainId = async () => {
    return (await ethersProvider().getNetwork()).chainId
}