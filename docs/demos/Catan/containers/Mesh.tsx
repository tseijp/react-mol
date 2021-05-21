import {useState, createElement as el} from 'react'
import {useAtom} from 'jotai'
import {useThree} from '@react-three/fiber'
import {useSpring} from 'react-spring/three'
import {useGesture} from 'react-use-gesture'
import {animated as a} from 'react-spring/three'
export function useMesh (value: any, atom: any, rock=false) {
    const [drag, setDrag] = useAtom(atom) as any,
          [mesh, setMesh] = useState(value),
        onHover = (e: any) => setDrag({hover: e.active && {mesh, setMesh}}),
        onDrag  = (e: any) => setDrag(e.first && {mesh, setMesh}) || (() => {
            if (!drag.hover?.setMesh) return
            if (!rock) setMesh((drag.hover || {}).mesh)
            drag.hover?.setMesh(mesh)
        })
    return [{mesh, onHover, onDrag} as any, setMesh]
}

export function Mesh (props: any) {
    const {children, onHover, onDrag, disable, ...other} = props
    const [s, api] = useSpring(() => ({position: [0, 0, 0], scale: [1, 1, 1]}))
    const aspect = useThree(_ => _.camera.position.y * _.size.width / _.viewport.width)
    const bind = useGesture({
        onDrag: e => {
            if (disable) return
            if (e.first) onDrag?.call(this, e)
            if (e.last) onDrag?.call(this, e)?.call(this, e)
            const [x, y] = e.movement,
                position = e.down? [x/aspect*1000, 1, y/aspect*1000]: [0, 0, 0]
            e.event.stopPropagation()
            api.start({position, scale: [1,1,1]})
        },
        onHover: e => {
            if (e.dragging || disable) return
            if (e.active) onHover?.call(this, e)
            if (!e.active) onHover?.call(this, e)?.call(this, e)
            e.event.stopPropagation()
            api.start({scale: e.hovering? [.8,.8,.8]: [1,1,1]})
        }
    })
    return el(a.group, other, el(a.mesh, {...bind(), ...s as any}, children))
}
