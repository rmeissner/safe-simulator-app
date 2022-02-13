import { Box } from "@mui/system"
import { ExtendedCallParams } from "@rmeissner/safe-simulator"
import Call from "./Call"

export interface Props {
    calls: ExtendedCallParams[]
}

const Calls: React.FC<Props> = ({ calls }) => {
    return (<Box>
        {calls.map((call) => (<Call call={call} />))}
    </Box>)
}

export default Calls