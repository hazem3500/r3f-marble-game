import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useGame } from './stores/useGame'

function Interface() {
    const timerRef = useRef()

    const gamePhase = useGame((state) => state.phase)
    const restartGame = useGame((state) => state.restart)

    const controls = useKeyboardControls((state) => state)

    useEffect(() => {
        return addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0

            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if (timerRef.current) timerRef.current.innerText = elapsedTime
        })
    }, [])

    return (
        <div className="interface">
            <h2 ref={timerRef} className="time">
                0.00
            </h2>

            {gamePhase === 'ended' && (
                <h2 className="restart" onClick={restartGame}>
                    Restart
                </h2>
            )}

            <div className="controls">
                <div className="raw">
                    <div className={`key ${controls.forward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${controls.left ? 'active' : ''}`}></div>
                    <div className={`key ${controls.backward ? 'active' : ''}`}></div>
                    <div className={`key ${controls.right ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${controls.jump ? 'active' : ''}`}></div>
                </div>
            </div>
        </div>
    )
}

export { Interface }
