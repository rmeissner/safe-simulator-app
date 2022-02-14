import { useCallback, useEffect, useState } from 'react';
import { loadMultisigTxs } from '../../logic/service/list';
import { getChainId as safeAppsChainId } from '../../logic/sapp/safeAppsSDK';
import { getChainId as injectedChainId } from '../../logic/injected/ethereum';
import { Box, Button, CircularProgress } from '@mui/material';
import { ethers } from 'ethers';
import MultisigTx from '../MultisigTransaction';
import { useNavigate } from 'react-router-dom';
import { ServiceMultisigTransaction } from '../../logic/service/types';

export interface Props {
    connectedToSafe: boolean
    safe: string
}

const TransactionList: React.FC<Props> = ({ safe, connectedToSafe }) => {
    const navigate = useNavigate()
    const [moreUrl, setMoreUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [multisigTxs, setMultisigTxs] = useState<ServiceMultisigTransaction[]>([])
    const loadMultisigTransactions = useCallback(async (safe: string, moreUrl?: string, txs?: ServiceMultisigTransaction[]) => {
        setLoading(true)
        try {
            if (!txs) setMultisigTxs([])
            const chainId = connectedToSafe ? await safeAppsChainId() : await injectedChainId()
            // TODO: add EIP-3770 validation
            const addressParts = safe.split(":")
            const cleanSafe = ethers.utils.getAddress(addressParts[addressParts.length - 1])
            const nextTxs = await loadMultisigTxs(chainId.toString(), cleanSafe, moreUrl)
            setMoreUrl(nextTxs.next)
            setMultisigTxs(txs ? txs.concat(nextTxs.results) : nextTxs.results)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [connectedToSafe, setMultisigTxs, setMoreUrl, setLoading])

    useEffect(() => {
        loadMultisigTransactions(safe)
    }, [safe, loadMultisigTransactions])
    return (<Box>
        { multisigTxs.map((tx) => <MultisigTx details={tx} onSelected={(safeTxHash) => navigate("/" + safeTxHash) } />) }
        { !loading && moreUrl && <Button variant='text' onClick={() => loadMultisigTransactions(safe, moreUrl, multisigTxs)}>Load more</Button>}
        { loading && <CircularProgress  sx={{ marginTop: "24px" }} />}
    </Box>)
}

export default TransactionList