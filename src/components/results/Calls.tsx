import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { decodeFunctionData, ExtendedCallParams, loadFunctionSignatures } from "@rmeissner/safe-simulator"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export interface Props {
    calls: ExtendedCallParams[]
}

interface DisplayCall {
    description: string,
    details: ExtendedCallParams,
    returnData?: string
    params?: string[]
}

const decodeReturnData = async (data: string): Promise<string | undefined> => {
    try {
        const decoded = await decodeFunctionData(data, loadFunctionSignatures)
        if (decoded.length === 0) return data
        return decoded[0].decoded.join(",")
    } catch(e) {
        return data
    }
}

const Calls: React.FC<Props> = ({ calls }) => {
    const [displayCalls, setDisplayCalls] = useState<DisplayCall[]>([])
    useEffect(() => {
        try {
            (async () => {
                const displayCalls = await Promise.all(calls.map(async (call) => {
                    const decoded = await decodeFunctionData(call.data, loadFunctionSignatures)
                    if (decoded.length === 0) {
                        return {
                            description: call.data.slice(0, 10),
                            details: call
                        }
                    }
                    const primary = decoded[0]
                    const returnData = call.returnData ? await decodeReturnData(call.returnData) : undefined
                    return {
                        description: primary.signature,
                        details: call,
                        returnData,
                        params: primary.decoded.map((p) => p.toString())
                    }
                }))
                setDisplayCalls(displayCalls)
            })()
        } catch (e) {
            console.error(e)
        }
    }, [calls, setDisplayCalls])
    return (<Box>
        {displayCalls.map((call) => (
            <Accordion>
                <AccordionSummary>{call.description}</AccordionSummary>
                <AccordionDetails>
                    To: {call.details.to}<br /><br />
                    Value: {ethers.utils.formatEther(call.details.value)}<br /><br />
                    {call.params && (<>
                        Parameters:<br />
                        {call.params.map((p) => (<>{p}<br /></>))}
                    </>)}
                    <br />
                    Raw data:<br />
                    <Typography sx={{
                        width: '100%',
                        textAlign: 'start',
                        wordWrap: 'break-word'
                    }}>{call.details.data}</Typography><br />
                    {call.details.returnData && (<>
                        Return data:<br />
                        <Typography sx={{
                            width: '100%',
                            textAlign: 'start',
                            wordWrap: 'break-word'
                        }}>{call.returnData}</Typography><br />
                    </>)}
                </AccordionDetails>
            </Accordion>)
        )}
    </Box>)
}

export default Calls