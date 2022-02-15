import { eip1193Provider, getChainId as injectedChainId } from '../../logic/injected/ethereum';
import { useCallback, useEffect, useState } from 'react';
import { simulateTx, SimulationResult } from '../../logic/simulation/processor';
import { loadTxDetails } from '../../logic/service/details';
import { getChainId as safeAppsChainId, safeAppsProvider } from '../../logic/sapp/safeAppsSDK';
import SimulationResults from './SimulationResults'
import MultisigTx from '../MultisigTransaction';
import { CircularProgress, Switch } from '@mui/material';
import { ServiceMultisigTransaction } from '../../logic/service/types';
import { ethers } from 'ethers';

export interface Props {
    safeTxHash: string,
    connectedToSafe: boolean,
}

interface Results {
    target: string,
    simulationResults: SimulationResult
}

const Simulation: React.FC<Props> = ({ safeTxHash, connectedToSafe }) => {
    const [runExecutionOnOriginalBlock, setRunExecutionOnOriginalBlock] = useState(true)
    const [simulationProgress, setSimulationProgress] = useState(false)
    const [safeTx, setSafeTx] = useState<ServiceMultisigTransaction | undefined>(undefined)
    const [results, setResults] = useState<Results | undefined>(undefined)
    const onSimulateTx = useCallback(async (safeTxHash: string, useLatestBlock: boolean) => {
        try {
            setSimulationProgress(true)
            setResults(undefined)
            setSafeTx(undefined)
            const chainId = connectedToSafe ? await safeAppsChainId() : await injectedChainId()
            const provider = connectedToSafe ? safeAppsProvider(chainId.toString()) : eip1193Provider()
            const safeTx = await loadTxDetails(chainId.toString(), safeTxHash)
            setSafeTx(safeTx)
            let targetBlock: string | number = "latest"
            if (!useLatestBlock) {
                const executionTransactionHash = safeTx.transactionHash
                const ethersProvider = new ethers.providers.Web3Provider(provider)
                const executionTx = await ethersProvider.getTransaction(executionTransactionHash)
                try {
                    const preExecutionBlock = executionTx.blockNumber!! - 1
                    await ethersProvider.getStorageAt(safeTx.safe, 0, preExecutionBlock)
                    targetBlock = preExecutionBlock
                } catch {
                    console.log("Cannot access archive state")
                    setRunExecutionOnOriginalBlock(false)
                }
            }
            const simulationResults = await simulateTx(provider, safeTx, targetBlock)
            setResults({
                target: safeTx.safe,
                simulationResults
            })
        } catch (e) {
            console.error(e)
        } finally {
            setSimulationProgress(false)
        }
    }, [connectedToSafe, setResults, setSimulationProgress, setSafeTx])

    const handleBlockTargetChange = (useExecutionBlock: boolean) => {
        setRunExecutionOnOriginalBlock(useExecutionBlock)
    }

    useEffect(() => {
        if (simulationProgress) return
        onSimulateTx(safeTxHash, !runExecutionOnOriginalBlock)
    }, [safeTxHash, runExecutionOnOriginalBlock])
    return (<>
        <Switch checked={runExecutionOnOriginalBlock} onChange={(e) => handleBlockTargetChange(e.target.checked)} disabled={simulationProgress} />Use block of execution time<br />
        {safeTx && (<>
            <h3>Safe</h3>
            {safeTx?.safe}
            <h3>Transaction</h3>
            <MultisigTx details={safeTx} />
        </>)}
        {results && (<SimulationResults results={results.simulationResults} />)}
        {simulationProgress && <CircularProgress  sx={{ marginTop: "24px" }} />}
    </>)
}

export default Simulation