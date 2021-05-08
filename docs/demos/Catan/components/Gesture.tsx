import {useRef, useMemo} from 'react'
import {useThree} from '@react-three/fiber'
import {useGesture} from 'react-use-gesture'
import {useSpring} from 'react-spring/three'

export function Gesture (props: {
    children: (bind: any) => JSX.Element,
    onHover?: (event: any) => any
    onDrag?: (event: any) => any,
    disableDrag?: boolean
    disableHover? :boolean
}): JSX.Element

export function Gesture (props: any) {
    const {children, onDrag, onHover, disableDrag, disableHover} = props
    const asp = useThree(({size, viewport}) => size.width / viewport.width)
    const hover = useRef(false)
    const [s,set] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))

    const b = useGesture({
        onDrag: (event) => {
            if (disableDrag) return
            const {first, last, down, movement: [x, y]} = event
            set({position: down? [10*x/asp, 1, 10*y/asp]: [0, 0, 0]})
            if (onDrag && (first || last))
                onDrag(event)
        },
        onHover: (event) => {
            if (hover.current === event.hovering || disableHover) return
            const {hovering} = event
            hover.current = hovering
            set({scale: hovering? [.8,.8,.8]: [1,1,1]})
            if (onHover)
                onHover(event)
        }
    }, {eventOptions: { pointer: true }})

    return useMemo(() => children(() => ({...b(), ...s})), [children, b, s])
}
