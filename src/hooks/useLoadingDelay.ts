import { useEffect, useState } from "react"




export const useLoadingDelay = (isLoading: boolean, delay: number) => {
    const [showPreloader, setShowPreloader] = useState(false);

    useEffect(() => {
        let timer: number | NodeJS.Timeout | null = null;
        if (isLoading) {
            timer = setTimeout(() => {
                setShowPreloader(true);
            }, delay);
        } else {
            if (timer !== null) {
                clearTimeout(timer as NodeJS.Timeout);
            }

            setShowPreloader(false);
        }

        return () => { if (timer !== null) clearTimeout(timer) };
    })

    return showPreloader;
}