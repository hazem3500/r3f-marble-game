import Ball from './Ball'
import Floor from './Floor'
import Obstacle from './Obstacle'
import Trophy from './Trophy'

export default function Level() {
    return (
        <>
            <Ball position-y={4} />
            <Floor scale-y={5} position-z={-45} />
            <Obstacle.Spinner position-z={-10} />
            <Obstacle position-z={-20} />
            <Obstacle.Limbo position-z={-34} />
            <Obstacle.Limbo position-z={-38} initialShift={0.5} />
            <Obstacle.Limbo position-z={-42} initialShift={1} />
            <Obstacle.SlidingWall position-z={-45} />
            <Obstacle.Spinner position-z={-60} speed={5} />
            <Obstacle.Spinner position-z={-75} speed={5} position-x={4} scale-x={0.75} />
            <Obstacle.Spinner position-z={-75} speed={5} position-x={-4} scale-x={0.75} invert />
            <Trophy position-z={-90} position-y={4} />
        </>
    )
}
