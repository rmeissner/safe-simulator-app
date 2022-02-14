import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { decodeFunctionData, ExtendedCallParams, loadFunctionSignatures } from "@rmeissner/safe-simulator"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export interface Props {
    label?: string,
    call: ExtendedCallParams
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
    } catch (e) {
        return data
    }
}

const Call: React.FC<Props> = ({ label, call, children }) => {
    const [displayCall, setDisplayCall] = useState<DisplayCall | undefined>(undefined)
    useEffect(() => {
        try {
            (async () => {
                const decoded = await decodeFunctionData(call.data, loadFunctionSignatures)
                if (decoded.length === 0) {
                    return {
                        description: call.data.slice(0, 10),
                        details: call
                    }
                }
                const primary = decoded[0]
                const returnData = call.returnData ? await decodeReturnData(call.returnData) : undefined
                const displayCall = {
                    description: primary.signature,
                    details: call,
                    returnData,
                    params: primary.decoded.map((p) => p.toString())
                }
                setDisplayCall(displayCall)
            })()
        } catch (e) {
            console.error(e)
        }
    }, [call, setDisplayCall])
    if (!displayCall) return <></>
    return (<Accordion>
        <AccordionSummary>{label && (<>{label} - </>)}{displayCall.description}</AccordionSummary>
        <AccordionDetails>
            To: {displayCall.details.to}<br /><br />
            Value: {ethers.utils.formatEther(displayCall.details.value)}<br /><br />
            {displayCall.params && (<>
                Parameters:<br />
                {displayCall.params.map((p) => (
                    <Typography sx={{
                        width: '100%',
                        textAlign: 'start',
                        wordWrap: 'break-word'
                    }}>{p}<br /></Typography>
                ))}
            </>)}
            <br />
            Raw data:<br />
            <Typography sx={{
                width: '100%',
                textAlign: 'start',
                wordWrap: 'break-word'
            }}>{displayCall.details.data}</Typography><br />
            {displayCall.returnData && (<>
                Return data:<br />
                <Typography sx={{
                    width: '100%',
                    textAlign: 'start',
                    wordWrap: 'break-word'
                }}>{displayCall.returnData}</Typography><br />
            </>)}
            {children}
        </AccordionDetails>
    </Accordion>)
}

export default Call