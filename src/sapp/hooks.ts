import { useCallback, useEffect, useState } from "react"
import { checkIsSafeApp } from "./safeAppsSDK"

export const useIsSafeApp = (): boolean | undefined => {
    const [isSafeApp, setIsSafeApp] = useState<boolean | undefined>()
    
    const checkSafeApp = useCallback(async () => {
        setIsSafeApp(await checkIsSafeApp())
    }, [setIsSafeApp])

    useEffect(() => {
        checkSafeApp()
    }, [checkSafeApp])
    return isSafeApp
}