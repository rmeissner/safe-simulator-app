import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { MultisigTransaction } from "@rmeissner/safe-simulator"
import { ethers } from "ethers"

export interface Props {
    details: MultisigTransaction
}

const MultisigTx: React.FC<Props> = ({ details }) => {
    return (<Accordion>
        <AccordionSummary>{ details.nonce } - { details.safeTxHash.slice(0, 10) } </AccordionSummary>
        <AccordionDetails>
            Hash: {details.safeTxHash}<br />
            To: {details.to}<br />
            Value: {ethers.utils.formatEther(details.value)}<br />
            Data: <Typography sx={{
                width: '100%',
                textAlign: 'start',
                wordWrap: 'break-word'
            }}>{details.data}</Typography>
            Operation: {details.operation}<br />
            Nonce: {details.nonce}<br />
            SafeTxGas: {details.safeTxGas}<br />
            BaseGas: {details.baseGas}<br />
            Gas Token: {details.gasToken}<br />
            Gas Price: {details.gasPrice}<br />
            Refund Receiver: {details.refundReceiver}<br />
            Gas Token: {details.refundReceiver}<br />
        </AccordionDetails>
    </Accordion>)
}

export default MultisigTx