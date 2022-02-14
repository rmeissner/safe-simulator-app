import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CallElement, decodeFunctionData, ExtendedCallParams, loadFunctionSignatures } from "@rmeissner/safe-simulator"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import Call from "./Call"

export interface Props {
    tree: CallElement[]
}

interface DisplayCall {
    description: string,
    details: ExtendedCallParams,
    returnData?: string
    params?: string[]
}

const CallTree: React.FC<Props> = ({ tree }) => {
    if (tree.length === 0) return <></>
    return <Box>
        {tree.map((element) => (
            <Call label={element.type} call={element.params}>
                <CallTree tree={element.children} />
            </Call>)
        )}
    </Box>
}

export default CallTree