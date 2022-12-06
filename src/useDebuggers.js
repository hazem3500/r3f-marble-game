import { Leva } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useState } from 'react'

function useDebuggers() {
    const [debug, setDebug] = useState(false)

    useEffect(() => {
        if (window.location.hash === '#debug') {
            setDebug(true)
        }
    }, [])

    return debug
}

export { useDebuggers }
