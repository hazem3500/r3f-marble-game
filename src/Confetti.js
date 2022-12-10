import { InstancedRigidBodies } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGame } from './stores/useGame'

const confettiColors = ['#E57CD8', '#A876F5', '#FF8A7A', '#FFDE91']

function Confetti({ count = 1000 }) {
    const confettiRef = useRef()

    const gameEnded = useGame((state) => state.phase) === 'ended'

    const { positions, rotations, scales, colors } = useMemo(() => {
        const positions = []
        const rotations = []
        const scales = []
        const colors = new Float32Array(count * 3)
        const color = new THREE.Color()

        for (let i = 0; i < count; i++) {
            positions.push([(Math.random() - 0.5) * 8, 15 + i * 0.2, (Math.random() - 0.5) * 8])
            rotations.push([Math.random(), Math.random(), Math.random()])

            const scale = 0.1 + Math.random() * 0.5
            scales.push([scale, scale, scale])

            colors.set(color.set(confettiColors[Math.floor(Math.random() * confettiColors.length)]).toArray(), i * 3)
        }

        return { positions, rotations, scales, colors }
    }, [count])

    if (!gameEnded) return null

    return (
        <InstancedRigidBodies positions={positions} rotations={rotations} scales={scales}>
            <instancedMesh ref={confettiRef} castShadow receiveShadow args={[null, null, count]}>
                <sphereGeometry>
                    <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
                </sphereGeometry>
                <meshLambertMaterial vertexColors toneMapped={false} />
            </instancedMesh>
        </InstancedRigidBodies>
    )
}

export { Confetti }
