import { RigidBody } from '@react-three/rapier'

export default function Floor(props) {
    return (
        <RigidBody type="fixed" rotation-x={Math.PI * -0.5} restitution={0.2} friction={4} {...props}>
            <mesh receiveShadow>
                <boxGeometry args={[20, 20, 1]} />
                <meshStandardMaterial color="#E57CD8" />
            </mesh>
        </RigidBody>
    )
}
