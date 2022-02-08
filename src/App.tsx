import './App.css';
import { useIsSafeApp } from './sapp/hooks';
import { eip1193Provider, getChainId as injectedChainId, hasInjectedProvider } from './injected/ethereum';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { useCallback, useState } from 'react';
import { simulateTx, SimulationResult } from './simulation/processor';
import { loadTxDetails } from './service/txDetails';
import { getChainId as safeAppsChainId, safeAppsProvider } from './sapp/safeAppsSDK';

interface Results {
  target: string,
  simulationResults: SimulationResult
}

function App() {
  const [safeTxHashInput, setSafeTxHashInput] = useState("")
  const [results, setResults] = useState<Results | undefined>(undefined)
  const [simulationProgress, setSimulationProgress] = useState(false)
  const connectedToSafe = useIsSafeApp()
  const hasProvider = hasInjectedProvider()
  const onSimulateTx = useCallback(async (safeTxHash: string) => {
    try {
      setSimulationProgress(true)
      const chainId = connectedToSafe ? await safeAppsChainId() : await injectedChainId()
      const provider = connectedToSafe ? safeAppsProvider(chainId.toString()) : eip1193Provider()
      const safeTx = await loadTxDetails(chainId.toString(), safeTxHash)
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
  }, [connectedToSafe, results, setResults, setSimulationProgress])
  if (connectedToSafe === undefined) return <>
    Loading...
  </>
  if (!connectedToSafe && !hasProvider) return <>
    Only supported as Safe app or with injected provider
  </>
  return (
    <div className="App">
      <Box>
        <TextField label="SafeTx Hash" variant="standard" value={safeTxHashInput} onChange={(e) => setSafeTxHashInput(e.target.value)} />
        {simulationProgress ?
          <CircularProgress /> :
          <Button onClick={() => onSimulateTx(safeTxHashInput)}>Simulate</Button>
        }
      </Box>
      {results && (<>
        <Box sx={{ paddingTop: "24px" }}>
          <h3>Target</h3>
        </Box>
        <Box>
          {results.target}
        </Box>
        <Box sx={{ paddingTop: "8px" }}>
          <h3>Calls</h3>
        </Box>
        <Box>
          {results.simulationResults.calls.get(results.target)?.map((call) => (<>
            {call.to} - {call.data.slice(0, 10)}<br />
          </>))}
        </Box>
        <Box sx={{ paddingTop: "8px" }}>
          <h3>Storage Changes</h3>
        </Box>
        <Box>
          {results.simulationResults.storageChanges.get(results.target)?.map((change) => (<>
            Slot <b>{change.slot}</b> to <b>{change.value}</b><br />
          </>))}
        </Box>
      </>)}
    </div>
  );
}

export default App;
