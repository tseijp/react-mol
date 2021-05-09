import {useRef, useMemo, createElement as el} from 'react'
import {useThree} from '@react-three/fiber'
import {useGesture} from 'react-use-gesture'
import {useSpring} from 'react-spring/three'
import {animated as a} from 'react-spring/three'

export function Gesture (props: any) {
    const {children, onDrag, onHover, disable=false} = props
    const hover = useRef(false)
    const aspect = useThree(({size, viewport}) => size.width / viewport.width)
    const [s,api] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))

    const b = useGesture({
        onDrag: (event) => {
            if (disable) return
            const {first, last, down, movement: [x, y]} = event
            api.start({position: down? [10*x/aspect, 1, 10*y/aspect]: [0, 0, 0]})
            if (onDrag && (first || last))
                onDrag(event)
        },
        onHover: (event) => {
            if (hover.current === event.hovering || disable) return
            const {hovering} = event
            hover.current = hovering
            api.start({scale: hovering? [.8,.8,.8]: [1,1,1]})
            if (onHover)
                onHover(event)
        }
    }, {eventOptions: { pointer: true }})

    return useMemo(() => el(a.group, {...b(), ...s as any}, children), [children, b, s])
}
