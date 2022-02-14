import './App.css';
import { useIsSafeApp } from './logic/sapp/hooks';
import { hasInjectedProvider } from './logic/injected/ethereum';
import { Route, Routes } from "react-router-dom";
import SimulationRoute from './routes/SimulationRoute';
import DashboardRoute from './routes/DashboardRoute';

function App() {
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
        <Route path="*" element={<DashboardRoute connectedToSafe={connectedToSafe} />} />
      </Routes>
    </div>
  );
}

export default App;
