import axios from "axios"
import { MultisigTransaction } from "@rmeissner/safe-simulator"
import { getServiceForChainId } from "./register"
import { Page } from "./types"

export const loadMultisigTxs = async(chainId: string, safe: string, url?: string): Promise<Page<MultisigTransaction>> => {
    const serviceUrl = getServiceForChainId(chainId)
    const resp = await axios.get<Page<MultisigTransaction>>(url || `${serviceUrl}/api/v1/safes/${safe}/multisig-transactions/?limit=20`)
    if (resp.status !== 200) throw Error("Could not load details")
    return resp.data
}