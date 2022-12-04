import { Canvas } from '@react-three/fiber'
import { Debug, Physics } from '@react-three/rapier'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { Interface } from './Interface'
import Level from './Level'
import Lights from './Lights'
import { NavigationControls } from './NavigationControls'
import { Title } from './Title'

function Experience() {
  const { debug } = useControls({
    debug: false
  })

  return (
    <Physics>
      {debug && <Debug />}
      <Title />
      <Level />
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

        <Perf position="top-left" />

        <Lights />

        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Interface />
    </NavigationControls>
  )
}
export default App
