import { useEffect, useMemo } from 'react'
import { useGame } from './stores/useGame'

function SoundManager() {
    const gamePhase = useGame((state) => state.phase)

    const successSound = useMemo(() => {
        const sound = new Audio('/success.wav')
        sound.volume = 0.2
        return sound
    }, [])
    const backgroundSound = useMemo(() => {
        const sound = new Audio('/background.wav')
        sound.loop = true
        return sound
    }, [])

    useEffect(() => {
        if (gamePhase === 'ready') {
            backgroundSound.volume = 0.05
        }
        if (gamePhase === 'playing') {
            backgroundSound.volume = 0.05
            backgroundSound.play()
        }
        if (gamePhase === 'ended') {
            backgroundSound.volume = 0.2
            successSound.currentTime = 0
            successSound.play()
        }
    }, [gamePhase])

    return null
}

export { SoundManager }
