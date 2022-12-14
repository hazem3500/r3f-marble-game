import { Center, Float, Text3D } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useControls } from 'leva'

const fontSettings = {
    font: '/inter.json',
    bevelEnabled: true,
    curveSegments: 12,
    bevelThickness: 0.2,
    bevelSize: 0.06,
    bevelOffset: 0.02,
    bevelSegments: 3,
    scale: 0.5,
    letterSpacing: -0.05
}

function Title() {
    return (
        <RigidBody position={[0, 4, 3]} type="fixed" restitution={8} friction={1}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Center>
                    <Text3D {...fontSettings}>
                        {`MARBLE  RACER`}
                        <meshPhysicalMaterial color="#ffffff" roughness={0.4} thickness={1} transmission={1.2} opacity={1} />
                    </Text3D>
                </Center>
            </Float>
        </RigidBody>
    )
}

export { Title }
