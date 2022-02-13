import './App.css';
import { useIsSafeApp } from './sapp/hooks';
import { hasInjectedProvider } from './injected/ethereum';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import SimulationRoute from './routes/SimulationRoute';

function App() {
  const [safeTxHashInput, setSafeTxHashInput] = useState("")
  const navigate = useNavigate()
  const connectedToSafe = useIsSafeApp()
  const hasProvider = hasInjectedProvider()
  if (connectedToSafe === undefined) return <>
    Loading...
  </>
  if (!connectedToSafe && !hasProvider) return <>
    Only supported as Safe app or with injected provider
  </>
  return (
    <div className="App">
      <Routes>
        <Route path=":safeTxHash" element={<SimulationRoute connectedToSafe={connectedToSafe} />} />
        <Route path="*" element={
          <Box>
            <TextField label="SafeTx Hash" variant="standard" value={safeTxHashInput} onChange={(e) => setSafeTxHashInput(e.target.value)} />
            <Button onClick={() => navigate("/" + safeTxHashInput)}>Simulate</Button>
          </Box>
        } />
      </Routes>
    </div>
  );
}

export default App;
