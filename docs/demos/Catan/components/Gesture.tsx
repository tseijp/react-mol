import {useRef, createElement as el} from 'react'
import {useThree} from '@react-three/fiber'
import {useSpring} from 'react-spring/three'
import {useGesture} from 'react-use-gesture'
import {animated as a} from 'react-spring/three'

export function Gesture (props: any) {
    const {children, onDrag, onHover, disable=false} = props
    const hover = useRef(false)
    const aspect = useThree(({size, viewport}) => size.width / viewport.width)
    const [s,api] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))
    const b = useGesture({
        onDrag: e => {
            if (disable) return
            const {movement: [x, y]} = e
            api.start({position: e.down? [10*x/aspect, 1, 10*y/aspect]: [0, 0, 0]})
            if (onDrag && (e.first || e.last))
                onDrag(e)
        },
        onHover: e => {
            if (hover.current === e.hovering || disable) return
            hover.current = e.hovering
            api.start({scale: e.hovering? [.8,.8,.8]: [1,1,1]})
            if (onHover)
                onHover(e)
        }
    })
    return el(a.group, {...b(), ...s as any}, children)
}
