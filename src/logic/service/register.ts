export const availableServices: Record<string, string> = {
    "1": "https://safe-transaction.mainnet.gnosis.io",
    "4": "https://safe-transaction.rinkeby.gnosis.io",
    "5": "https://safe-transaction.goerli.gnosis.io",
    "10": "https://safe-transaction.optimism.gnosis.io",
    "100": "https://safe-transaction.xdai.gnosis.io",
    "137": "https://safe-transaction.polygon.gnosis.io",
    "42161": "https://safe-transaction.arbitrum.gnosis.io",
    "43114": "https://safe-transaction.avalanche.gnosis.io",
    "1313161554": "https://safe-transaction.aurora.gnosis.io"
}

export const getServiceForChainId = (chainId: string | number): string => {
    const service = availableServices[chainId.toString()]
    if (!service) throw Error("No service available")
    return service
}