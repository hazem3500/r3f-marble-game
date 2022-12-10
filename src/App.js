import { Canvas } from '@react-three/fiber'
import { Debug, Physics } from '@react-three/rapier'
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { Interface } from './Interface'
import Level from './Level'
import Lights from './Lights'
import { NavigationControls } from './NavigationControls'
import { Title } from './Title'
import { useDebuggers } from './useDebuggers'
import { initStudio, TheatreProvider } from './TheatreStudio'
import { SoundManager } from './SoundManager'

if (process.env.NODE_ENV === 'development') {
    initStudio()
}

function Experience() {
    const { debug } = useControls({
        debug: false
    })

    return (
        <Physics>
            {debug && <Debug />}
            <Title />
            <Level />
            <SoundManager />
        </Physics>
    )
}

function App() {
    const shouldUseDebuggers = useDebuggers()

    return (
        <NavigationControls>
            <Canvas
                shadows
                camera={{
                    position: [0, 5, 10]
                }}>
                <TheatreProvider>
                    <color attach="background" args={['#FEF9F7']} />

                    {shouldUseDebuggers && <Perf position="bottom-left" />}

                    <Lights />

                    <Suspense fallback={null}>
                        <Experience />
                    </Suspense>
                </TheatreProvider>
            </Canvas>
            <Interface />
            <Leva hidden={!shouldUseDebuggers} />
        </NavigationControls>
    )
}
export default App
