import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import UseAnimations from 'react-useanimations'
import volume from 'react-useanimations/lib/volume'
import { useAudio } from './stores/useAudio'
import { useGame } from './stores/useGame'

function Interface() {
    const timerRef = useRef()

    const audio = useAudio((state) => state.audio)
    const toggleAudio = useAudio((state) => state.toggleAudio)

    const highScore = useGame((state) => state.highScore)
    const gamePhase = useGame((state) => state.phase)
    const startGame = useGame((state) => state.start)
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

    function handleToggleAudio(e) {
        toggleAudio()
        e.target.blur()
    }

    return (
        <div className="interface">
            {highScore > 0 && (
                <div className="high-score">
                    <h2>High Score: {(highScore / 1000).toFixed(2)}</h2>
                </div>
            )}

            <button className="audio-toggle" onClick={handleToggleAudio}>
                <UseAnimations animation={volume} reverse={!audio} strokeColor="white" />
            </button>

            <h2 ref={timerRef} className="time">
                0.00
            </h2>

            {gamePhase === 'ready' && (
                <h2 className="cta" onClick={startGame}>
                    Play
                </h2>
            )}

            {gamePhase === 'ended' && (
                <h2 className="cta" onClick={restartGame}>
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

            <div className="misc-controls">
                <div className="misc-control">
                    <div className="key">R</div>
                    <div className="label">Reset</div>
                </div>
                <div className="misc-control">
                    <div className="key">M</div>
                    <div className="label">Mute/Unmute</div>
                </div>
            </div>
        </div>
    )
}

export { Interface }
