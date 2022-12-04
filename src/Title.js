import { Float, Text } from '@react-three/drei'

function Title() {
  return (
    <Float position={[0, 4, -4]}>
      <Text scale={20} color="black">
        MARBLE RACER
      </Text>
    </Float>
  )
}

export { Title }
