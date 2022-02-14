import { MultisigTransaction } from "@rmeissner/safe-simulator";

export interface Page<T> {
    next: string | null,
    results: T[]
}

export interface ServiceMultisigTransaction extends MultisigTransaction {
    isExecuted: boolean
}