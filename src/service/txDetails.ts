import axios from "axios"
import { MultisigTransaction } from "safe-simulator"
import { getServiceForChainId } from "./register"

export const loadTxDetails = async(chainId: string, safeTxHash: string): Promise<MultisigTransaction> => {
    const serviceUrl = getServiceForChainId(chainId)
    const resp = await axios.get<MultisigTransaction>(`${serviceUrl}/api/v1/multisig-transactions/${safeTxHash}/`)
    if (resp.status !== 200) throw Error("Could not load details")
    return resp.data
}