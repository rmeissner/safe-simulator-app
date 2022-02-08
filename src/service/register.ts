export const availableServices: Record<string, string> = {
    "1": "https://safe-transaction.mainnet.gnosis.io",
    "4": "https://safe-transaction.rinkeby.gnosis.io"
}

export const getServiceForChainId = (chainId: string | number): string => {
    const service = availableServices[chainId.toString()]
    if (!service) throw Error("No service available")
    return service
}