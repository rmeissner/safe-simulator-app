import axios from "axios"
import { getServiceForChainId } from "./register"
import { Page, ServiceMultisigTransaction } from "./types"

export const loadMultisigTxs = async(chainId: string, safe: string, url?: string): Promise<Page<ServiceMultisigTransaction>> => {
    const serviceUrl = getServiceForChainId(chainId)
    const resp = await axios.get<Page<ServiceMultisigTransaction>>(url || `${serviceUrl}/api/v1/safes/${safe}/multisig-transactions/?limit=20`)
    if (resp.status !== 200) throw Error("Could not load details")
    return resp.data
}