import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useGame } from './stores/useGame'

export default function Ball(props) {
    const { rapier, world } = useRapier()

    const gamePhase = useGame((state) => state.phase)
    const startGame = useGame((state) => state.start)
    const restartGame = useGame((state) => state.restart)

    const cameraProperties = useMemo(
        () => ({
            position: new THREE.Vector3(0, 20, 20),
            target: new THREE.Vector3()
        }),
        []
    )

    const ballRef = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const jumpHandler = useCallback(() => {
        const rapierWorld = world.raw()

        const ballPosition = ballRef.current.translation()
        const groundDirection = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(ballPosition, groundDirection)
        const hit = rapierWorld.castRay(ray)
        const isBallOnGround = hit?.toi < 1

        if (isBallOnGround) {
            ballRef.current.applyImpulse({ x: 0, y: 15, z: 0 })
        }
    }, [ballRef, rapier, world])

    const resetHandler = useCallback(() => {
        ballRef.current.setTranslation({ x: 0, y: 4, z: 0 })
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 })
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 })
    }, [ballRef])

    useEffect(() => {
        return subscribeKeys(
            ({ jump, reset }) => ({ jump, reset }),
            ({ jump, reset }) => {
                if (jump) jumpHandler()
                if (reset) restartGame()
            }
        )
    }, [subscribeKeys, jumpHandler, restartGame])

    useEffect(() => {
        return useGame.subscribe(
            (state) => state.phase,
            (phase) => {
                if (phase === 'ready') resetHandler()
            }
        )
    }, [resetHandler])

    useFrame((_, delta) => {
        const { forward, backward, left, right } = getKeys()

        if (gamePhase === 'ready' && (forward || backward || left || right)) startGame()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 50 * delta
        const torqueStrength = 1 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (left) {
            impulse.x -= impulseStrength
            torque.z -= torqueStrength
        }
        if (right) {
            impulse.x += impulseStrength
            torque.z += torqueStrength
        }

        ballRef.current.applyImpulse(impulse)
        ballRef.current.applyTorqueImpulse(torque)
    })

    useFrame(({ camera }, delta) => {
        const ballPosition = ballRef.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(ballPosition)
        cameraPosition.z += 3.5
        cameraPosition.y += 2

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(ballPosition)
        cameraTarget.y += 0.5

        cameraProperties.position.lerp(cameraPosition, 5 * delta)
        cameraProperties.target.lerp(cameraTarget, 5 * delta)

        camera.position.copy(cameraProperties.position)
        camera.lookAt(cameraProperties.target)
    })

    useFrame(() => {
        const ballPosition = ballRef.current.translation()
        if (ballPosition.y < -10) restartGame()
    })

    return (
        <RigidBody
            ref={ballRef}
            name="marble"
            colliders="ball"
            mass={2}
            restitution={0.2}
            friction={10}
            linearDamping={1}
            angularDamping={1}
            {...props}>
            <mesh castShadow>
                <sphereGeometry />
                <meshStandardMaterial color="#FFDE91" />
            </mesh>
        </RigidBody>
    )
}
