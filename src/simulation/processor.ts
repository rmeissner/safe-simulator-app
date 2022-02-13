import { ethers } from 'ethers'
import memdown from 'memdown'
import Ganache from 'ganache-core'
import Simulator, { CallElement, CallHandler, EvmConnector, ExtendedCallParams, GanacheCoreConnector, HandlerAnalyzer, MultisigTransaction, SafeInfo, SafeInfoProvider, StepHandler, StorageHandler } from '@rmeissner/safe-simulator'
import { circularProgressClasses } from '@mui/material'

const baseOptions: any = { db_path: "/", gasLimit: 100_000_000, gasPrice: "0x0", vmErrorsOnRPCResponse: false, logging: { quiet: true, verbose: false, debug: false } }

const buildSimulationEnv = (provider: any): SimulationEnv => {
    const options = baseOptions
    options.db = memdown()
    options.fork = provider
    const network = Ganache.provider(options)
    const connector = new GanacheCoreConnector(network)
    const simulator = new Simulator(connector)
    return {
        connector,
        simulator
    }
}

const buildAnalyzer = () => {
    const callHandler = new CallHandler()
    const storageHandler = new StorageHandler()
    const handlers: StepHandler[] = [
        callHandler,
        storageHandler
    ]
    const analyzer = new HandlerAnalyzer(handlers)
    return {
        analyzer,
        callHandler,
        storageHandler
    }
}

export interface SimulationEnv {
    connector: EvmConnector,
    simulator: Simulator
}

export interface SimulationResult {
    simulationEnv: SimulationEnv,
    success: boolean,
    logs: ethers.providers.Log[],
    callTree: CallElement[],
    calls: Map<string, ExtendedCallParams[]>,
    storageChanges: Map<string, any[]>,
    safeAddress: string,
    safeInfo: SafeInfo
}

export const simulateTx = async (network: ethers.providers.ExternalProvider, safeTx: MultisigTransaction, simulationEnv?: SimulationEnv) => {
    console.log({safeTx})
    const holder: SimulationEnv = simulationEnv || buildSimulationEnv(network)
    const provider = new ethers.providers.Web3Provider(holder.connector as any)
    const infoProvider = new SafeInfoProvider(provider)
    const safeInfo = await infoProvider.loadInfo(safeTx.safe)
    const { analyzer, callHandler, storageHandler } = buildAnalyzer()
    const txHash = await holder.simulator.simulateMultiSigTransaction(safeInfo, safeTx, analyzer)
    const txReceipt = await provider.getTransactionReceipt(txHash)
    return {
        simulationEnv: holder,
        success: txReceipt.status === 0 ? false : true,
        logs: txReceipt.logs,
        callTree: callHandler.roots,
        calls: callHandler.calls,
        storageChanges: storageHandler.storageChanges,
        safeAddress: safeTx.safe,
        safeInfo
    }
}