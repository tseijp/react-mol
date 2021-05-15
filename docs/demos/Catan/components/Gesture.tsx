import {createElement as el} from 'react'
import {useThree} from '@react-three/fiber'
import {useSpring} from 'react-spring/three'
import {useGesture} from 'react-use-gesture'
import {animated as a} from 'react-spring/three'

export function Gesture (props: any) {
    const {children, onDrag, onHover, disable=false, ...other} = props
    const aspect = useThree(({size, viewport}) => size.width / viewport.width)
    const [s,api] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))
    const b = useGesture({
        onDrag: e => {
            if (disable) return
            if (e.first) onDrag?.call(this, e)
            if (e.last) onDrag?.call(this, e)?.call(this, e)
            const [x, y] = e.movement,
                position = e.down? [10*x/aspect, 1, 10*y/aspect]: [0, 0, 0]
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
    return el(a.group, other, el(a.group, {...b(), ...s as any}, children))
}
