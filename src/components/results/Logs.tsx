import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { Box } from "@mui/system"
import { decodeLog, loadEventSignatures } from "@rmeissner/safe-simulator"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export interface Props {
    logs: ethers.providers.Log[]
}

interface DisplayLog {
    address: string,
    description: string
    params?: string[]
}

const Logs: React.FC<Props> = ({ logs }) => {
    const [displayLogs, setDisplayLogs] = useState<DisplayLog[]>([])
    useEffect(() => {
        (async () => {
            const results = await Promise.all(logs.map(async (log) => {
                const decoded = await decodeLog(log, loadEventSignatures)
                if (decoded.length === 0) {
                    return {
                        address: log.address,
                        description: "Unknown event",
                    }
                }
                const primary = decoded[0]
                return {
                    address: log.address,
                    description: primary.signature,
                    params: primary.decoded.map((p) => p.toString())
                }
            }))
            setDisplayLogs(results)
        })()
    }, [logs, setDisplayLogs])
    return (<Box>
        {displayLogs.length === 0 && <h4>No events have been emitted</h4>}
        {displayLogs.map((log) => (<Accordion>
            <AccordionSummary>{log.description}</AccordionSummary>
            <AccordionDetails sx={{ textAlign: "left" }}>
                emitted by<br />
                <b>{log.address}</b><br />
                <br />
                Parameters:<br />
                {log.params?.map((p) => (<>{p}<br /></>))}
            </AccordionDetails>
        </Accordion>))}
    </Box>)
}

export default Logs