import { Box } from "@mui/system"
import { SimulationResult } from "../../logic/simulation/processor"
import Logs from './results/Logs'
import Calls from './results/Calls'
import StorageChanges from './results/StorageChanges'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import CallTree from "./results/CallTree"

export interface Props {
    results: SimulationResult
}

const SimulationResults: React.FC<Props> = ({ results }) => {

    const targetCalls = results.calls.get(results.safeAddress)
    const otherCalls = []
    for (const [caller, calls] of results.calls) {
        if (caller !== results.safeAddress)
            otherCalls.push({
                target: caller,
                calls
            })
    }

    const targetChanges = results.storageChanges.get(results.safeAddress)
    const otherChanges = []
    for (const [holder, changes] of results.storageChanges) {
        if (holder !== results.safeAddress)
            otherChanges.push({
                target: holder,
                changes
            })
    }

    return (<>
        <Box sx={{ paddingTop: "8px" }}>
            <h3>Status:</h3>
            {results.success ? (<Typography sx={{ color: "green" }}>Success</Typography>) : (<Typography sx={{ color: "red" }}>Failure</Typography>)}
        </Box>
        {targetCalls && (<>
            <Box sx={{ paddingTop: "8px" }}>
                <h3>Calls from target Safe</h3>
            </Box>
            <Calls calls={targetCalls} />
        </>)}
        {targetChanges && (<>
            <Box sx={{ paddingTop: "8px" }}>
                <h3>Storage Changes on target Safe</h3>
            </Box>
            <StorageChanges changes={targetChanges} />
        </>)}
        <Box sx={{ paddingTop: "8px" }}>
            <h3>Logs</h3>
        </Box>
        <Logs logs={results.logs} />
        <h3>Advanced Information</h3>
        <Accordion>
            <AccordionSummary>Click to show</AccordionSummary>
            <AccordionDetails>
                {otherCalls.length > 0 && (<>
                    <Box sx={{ paddingTop: "8px" }}>
                        <h3>Calls from other contracts</h3>
                    </Box>
                    {otherCalls.map((e) => <Accordion>
                        <AccordionSummary>{e.target}</AccordionSummary>
                        <AccordionDetails>
                            <Calls calls={e.calls} />
                        </AccordionDetails>
                    </Accordion>)}
                </>)}
                <Box sx={{ paddingTop: "8px" }}>
                    <h3>Call Tree</h3>
                </Box>
                <CallTree tree={results.callTree} />
                {otherChanges.length > 0 && (<>
                    <Box sx={{ paddingTop: "8px" }}>
                        <h3>Storage Changes on other contracts</h3>
                    </Box>
                    {otherChanges.map((e) => <Accordion>
                        <AccordionSummary>{e.target}</AccordionSummary>
                        <AccordionDetails>
                            <StorageChanges changes={e.changes} decode={false} />
                        </AccordionDetails>
                    </Accordion>)}
                </>)}
            </AccordionDetails>
        </Accordion>
    </>)
}

export default SimulationResults