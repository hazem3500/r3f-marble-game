import React, { useRef, useMemo } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useGame } from './stores/useGame'

export default function Trophy(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('./heart.gltf')

    const endGame = useGame((state) => state.end)
    const hitSound = useMemo(() => new Audio('/hit.mp3'), [])

    function onHit({ other }) {
        if (other.rigidBodyObject.name === 'marble') {
            endGame()
        }

        hitSound.currentTime = 0
        hitSound.volume = Math.random() * 0.2
        hitSound.play()
    }

    return (
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0} onCollisionEnter={onHit} {...props}>
            <Float speed={6} rotationIntensity={2} floatIntensity={4}>
                <group ref={group} scale={5} dispose={null}>
                    <mesh castShadow geometry={nodes.Heart.geometry} material={materials.Heart} rotation={[0, 0, -Math.PI / 2]} />
                </group>
            </Float>
        </RigidBody>
    )
}

useGLTF.preload('./heart.gltf')
