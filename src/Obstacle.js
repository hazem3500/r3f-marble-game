import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { forwardRef, useRef, useId, useMemo } from 'react'
import * as THREE from 'three'
import { editable as e } from '@theatre/r3f'

const Obstacle = forwardRef(function Obstacle(props, ref) {
    const id = useId()

    const hitSound = useMemo(() => new Audio('/hit.mp3'), [])

    function onHit({ totalForceMagnitude }) {
        hitSound.currentTime = 0
        hitSound.volume = Math.min(totalForceMagnitude / 10000, 1)
        hitSound.play()
    }

    return (
        <e.group theatreKey={`obstacle-${id}`}>
            <RigidBody ref={ref} type="kinematicPosition" position-y={2} restitution={2} friction={1} onContactForce={onHit} {...props}>
                <mesh receiveShadow castShadow>
                    <boxGeometry args={[10, 1, 1]} />
                    <meshStandardMaterial color="#A876F5" />
                </mesh>
            </RigidBody>
        </e.group>
    )
})

const Spinner = function ({ speed = 1, initialShift = Math.random() * 10, invert = false, ...props }) {
    const obstacleRef = useRef()

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, (time * speed + initialShift) * (invert ? -1 : 1), 0))
        obstacleRef.current.setNextKinematicRotation(rotation)
    })

    return <Obstacle ref={obstacleRef} {...props} />
}

const Limbo = function ({ speed = 1, initialShift = 0, ...props }) {
    const obstacleRef = useRef()

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        const obstacleTranslation = obstacleRef?.current?.translation()

        obstacleRef.current.setNextKinematicTranslation({
            x: obstacleTranslation.x,
            y: Math.abs(Math.sin(time * speed + initialShift) * 5) + 1,
            z: obstacleTranslation.z
        })
    })

    return <Obstacle ref={obstacleRef} scale-x={1.6} {...props} />
}

const SlidingWall = function ({ speed = 1, initialShift = 0, ...props }) {
    const obstacleRef = useRef()

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()

        const obstacleTranslation = obstacleRef?.current?.translation()

        obstacleRef.current.setNextKinematicTranslation({
            x: Math.sin(time * speed + initialShift) * 5 + 1,
            y: obstacleTranslation.y,
            z: obstacleTranslation.z
        })
    })

    return <Obstacle ref={obstacleRef} scale-y={5} position-y={3} {...props} />
}

Obstacle.Spinner = Spinner
Obstacle.Limbo = Limbo
Obstacle.SlidingWall = SlidingWall

export default Obstacle
