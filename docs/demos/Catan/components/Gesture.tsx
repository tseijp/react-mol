import {createElement as el} from 'react'
import {useThree} from '@react-three/fiber'
import {useSpring} from 'react-spring/three'
import {useGesture} from 'react-use-gesture'
import {animated as a} from 'react-spring/three'

export function Gesture (props: any) {
    const {children, rotation, disable=false, onHover, onDrag, ...other} = props
    const aspect = useThree(({size, viewport, camera}) =>camera.position.y * size.width / viewport.width)
    const [s,api] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))
    const b = useGesture({
        onDrag: e => {
            if (disable) return
            if (e.first) onDrag?.call(this, e)
            if (e.last) onDrag?.call(this, e)?.call(this, e)
            const [x, y] = e.movement,
                position = e.down? [x/aspect*1000, 1, y/aspect*1000]: [0, 0, 0]
            api.start({position, scale: [1,1,1]})
        },
        onHover: e => {
            if (disable || e.dragging) return
            if (e.active) onHover?.call(this, e)
            if (!e.active) onHover?.call(this, e)?.call(this, e)
            e.event.stopPropagation()
            api.start({scale: e.hovering? [.8,.8,.8]: [1,1,1]})
        }
    })
    return el(a.group, other, el(a.mesh, {...b(), ...s as any, rotation}, children))
}
