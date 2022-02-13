import Simulation from '../components/Simulation';
import { useParams } from 'react-router-dom';

export interface Props {
    connectedToSafe: boolean,
}

const SimulationRoute: React.FC<Props> = ({ connectedToSafe }) => {
    const params = useParams();
    if (!params.safeTxHash) return <></>
    return (<Simulation safeTxHash={params.safeTxHash} connectedToSafe={connectedToSafe} />)
}

export default SimulationRoute