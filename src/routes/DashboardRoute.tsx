import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../components/transactions/TransactionList';
import { getSafeInfo } from '../logic/sapp/safeAppsSDK';

export interface Props {
    connectedToSafe: boolean,
}

const LAST_SAFE_STORAGE_KEY = "SafeSimulator_Dashboard_LastSafe"

const DashboardRoute: React.FC<Props> = ({ connectedToSafe }) => {
    const [safe, setSafe] = useState(localStorage.getItem(LAST_SAFE_STORAGE_KEY))
    const [safeTxHashInput, setSafeTxHashInput] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            if (!connectedToSafe) return
            const safeInfo = await getSafeInfo()
            setSafe(safeInfo.safeAddress)
        })()
    }, [connectedToSafe, setSafe])
    const selectSafe = (safe: string) => {
        localStorage.setItem(LAST_SAFE_STORAGE_KEY, safe)
        setSafe(safe)
    }
    return (<Box>
        <Box sx={{flexDirection: "row", display: "flex", alignItems: "center"}}>
            {!connectedToSafe && <TextField label="Safe" variant="standard" value={safe} onChange={(e) => selectSafe(e.target.value)} sx={{ marginRight: "16px" }} />}
            <TextField label="SafeTx Hash" variant="standard" value={safeTxHashInput} onChange={(e) => setSafeTxHashInput(e.target.value)} />
            <Button onClick={() => navigate("/" + safeTxHashInput)}>Simulate</Button>
        </Box>
        {safe && <TransactionList connectedToSafe={connectedToSafe} safe={safe} />}
    </Box>)
}

export default DashboardRoute