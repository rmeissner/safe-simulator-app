import { Accordion, AccordionDetails, AccordionSummary, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { DecodedStorageChange, decodeSafeStorageChange, StorageChange } from "@rmeissner/safe-simulator"
import React, { useEffect, useState } from "react"

export interface Props {
    changes: StorageChange[]
    decode?: boolean
}

interface DisplayStorageChanges {
    description: string,
    value: string,
    history: string[]
}

const StorageChanges: React.FC<Props> = ({ changes, decode }) => {
    const [displayChanges, setDisplayChange] = useState<DisplayStorageChanges[]>([])
    useEffect(() => {
        const storageSlots: string[] = []
        const storageChanges: Record<string, DisplayStorageChanges> = {}
        try {
            changes.forEach((change) => {
                const c: DecodedStorageChange = decode === false ? change :decodeSafeStorageChange(change)
                if (!storageChanges[c.slot]) {
                    storageSlots.push(c.slot)
                    storageChanges[c.slot] = {
                        description: c.slotName || c.slot,
                        value: c.valueDecoded?.toString() || c.value,
                        history: []
                    }
                } else {
                    const storageChange = storageChanges[c.slot]
                    storageChange.history.push(storageChange.value)
                    storageChange.value = c.valueDecoded?.toString() || c.value
                }
            })
        } catch (e) {
            console.error(e)
        }
        setDisplayChange(storageSlots.map((slot) => storageChanges[slot]))
    }, [changes, setDisplayChange])

    return (<Box>
        {displayChanges.map((change) => (<Accordion>
            <AccordionSummary>{change.description}</AccordionSummary>
            <AccordionDetails>
                New value {change.history.length > 0 && (<Tooltip title={<React.Fragment>
                    {change.history.map((change) => <>{change}<br /></>)}
                </React.Fragment>}><i>({change.history.length} more changes)</i></Tooltip>)}:<br />
                <b>{change.value}</b>
            </AccordionDetails>
        </Accordion>))}
    </Box>)
}

export default StorageChanges