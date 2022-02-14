import axios from "axios"
import { getServiceForChainId } from "./register"
import { ServiceMultisigTransaction } from "./types"

export const loadTxDetails = async(chainId: string, safeTxHash: string): Promise<ServiceMultisigTransaction> => {
    const serviceUrl = getServiceForChainId(chainId)
    const resp = await axios.get<ServiceMultisigTransaction>(`${serviceUrl}/api/v1/multisig-transactions/${safeTxHash}/`)
    if (resp.status !== 200) throw Error("Could not load details")
    return resp.data
}