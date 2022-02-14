import Simulation from '../components/simulation/Simulation';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export interface Props {
    connectedToSafe: boolean,
}

const SimulationRoute: React.FC<Props> = ({ connectedToSafe }) => {
    const params = useParams();
    const navigate = useNavigate()
    if (!params.safeTxHash) {
        navigate("/")
        return <></>
    }
    return (<>
        <Button onClick={() => navigate("/")}>&lt; Back</Button><br />
        <Simulation safeTxHash={params.safeTxHash} connectedToSafe={connectedToSafe} />
    </>)
}

export default SimulationRoute