import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Lights() {
    const lightRef = useRef()

    useFrame(({ camera }) => {
        lightRef.current.position.z = camera.position.z + 1
        lightRef.current.target.position.z = camera.position.z
        lightRef.current.target.updateMatrixWorld()
    })

    return (
        <>
            <directionalLight
                ref={lightRef}
                castShadow
                position={[4, 6, 1]}
                intensity={1.5}
                shadow-mapSize={[4096, 4096]}
                shadow-camera-near={0.01}
                shadow-camera-far={20}
                shadow-camera-top={20}
                shadow-camera-right={100}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
            />
            <ambientLight intensity={0.5} color="#FFDE91" />
        </>
    )
}
