import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { Interface } from './Interface'
import Level from './Level'
import Lights from './Lights'
import { NavigationControls } from './NavigationControls'
import { Title } from './Title'
import { SoundManager } from './SoundManager'
import '@fontsource/inter'
import { ShortcutManager } from './ShortcutManager'

function Experience() {
    return (
        <Physics>
            <Title />
            <Level />
            <SoundManager />
        </Physics>
    )
}

function App() {

    return (
        <NavigationControls>
            <Canvas
                shadows
                camera={{
                    position: [0, 5, 10]
                }}>
                <color attach="background" args={['#FEF9F7']} />

                <Lights />

                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </Canvas>
            <Interface />
            <ShortcutManager />
        </NavigationControls>
    )
}
export default App
