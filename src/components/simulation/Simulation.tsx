import { eip1193Provider, getChainId as injectedChainId } from '../../logic/injected/ethereum';
import { useCallback, useEffect, useState } from 'react';
import { simulateTx, SimulationResult } from '../../logic/simulation/processor';
import { loadTxDetails } from '../../logic/service/details';
import { getChainId as safeAppsChainId, safeAppsProvider } from '../../logic/sapp/safeAppsSDK';
import SimulationResults from './SimulationResults'
import { MultisigTransaction } from '@rmeissner/safe-simulator';
import MultisigTx from '../MultisigTransaction';
import { CircularProgress } from '@mui/material';

export interface Props {
    safeTxHash: string,
    connectedToSafe: boolean,
}

interface Results {
    target: string,
    simulationResults: SimulationResult
}

const Simulation: React.FC<Props> = ({ safeTxHash, connectedToSafe }) => {
    const [simulationProgress, setSimulationProgress] = useState(false)
    const [safeTx, setSafeTx] = useState<MultisigTransaction | undefined>(undefined)
    const [results, setResults] = useState<Results | undefined>(undefined)
    const onSimulateTx = useCallback(async (safeTxHash: string) => {
        try {
            setSimulationProgress(true)
            setResults(undefined)
            setSafeTx(undefined)
            const chainId = connectedToSafe ? await safeAppsChainId() : await injectedChainId()
            const provider = connectedToSafe ? safeAppsProvider(chainId.toString()) : eip1193Provider()
            const safeTx = await loadTxDetails(chainId.toString(), safeTxHash)
            setSafeTx(safeTx)
            const simulationResults = await simulateTx(provider, safeTx)
            setResults({
                target: safeTx.safe,
                simulationResults
            })
        } catch (e) {
            console.error(e)
        } finally {
            setSimulationProgress(false)
        }
    }, [connectedToSafe, results, setResults, setSimulationProgress, setSafeTx])
    useEffect(() => {
        onSimulateTx(safeTxHash)
    }, [safeTxHash])
    return (<>
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