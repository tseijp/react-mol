import React, {Children} from 'react'
import {Provider} from 'jotai'
import {Render} from './Render'
import {useMol} from './useMol'
import {Vec3, Props} from './types'
import {eulerVec3, scaleVec3, mergeVec3, calcRelative} from './utils'

const sqrt2_3 = Math.sqrt(2/3)
const sqrt1_3 = Math.sqrt(1/3)
// const defaultGeometry = [new THREE.SphereBufferGeometry(1, 32, 32), new THREE.CylinderBufferGeometry(.05,.05,1,10)]
// const defaultMaterial = [new THREE.MeshPhongMaterial(), new THREE.MeshPhongMaterial()]

export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
export const Recursion = (props:any) => {
    const [child, ...children] = React.Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    return React.cloneElement(child, {
        ...props, depth: 1, children: [
            ...(React.Children.toArray(child.props.children) || []),
            <Recursion key={-1} {...{children}}/>
        ]
    })
}
export function Atom <S extends object> (
    props: unknown & Partial<Props>
): null | JSX.Element

export function Atom ({
    geometry,
    material,
    children,
    length=0,
    depth =0,
    ...props
}: any) {
    if (!(children instanceof Array)) children = React.Children.map(children, c=>c)
    const Atom = props.element? Hierarchy : Recursion
    if (typeof depth==="number" && depth > 0) return <Atom {...props}>{children.slice(length*2)}</Atom>
    return (
        <Provider>
            <Render length={length}>
                {[...children.slice(0,length*2),
                <Atom {...props} key={0}
                    position= {props.position|| [0,0,0]}
                    calc    = {props.calc    || calc}
                    calcPos = {props.calcPos || calcPos}>
                    {children.slice(length*2)}
                </Atom>]}
            </Render>
        </Provider>
    )
}
export function calcPos (target:Props, parent:Props, key=0): Vec3 {
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
    return mergeVec3(Array(4).fill(1),
        calcRelative((key<3? vec: [0,-1,0]) as Vec3, target.rotation, parent.direction),
        parent.position || [0,0,0], // TODO use group.updateMatrix()
        target.position || [0,0,0],
        target.double
            ? calcPos({...target,double:false}, parent,key+(key?2:3))
            : [0,0,0]
    )
}
export const calc = (props:Props): Props[] => {
    const {position: target=[0,0,0], parentProps} = props
    const position = mergeVec3([.5,.5], target, parentProps?.position||target)
    const distance = mergeVec3([ 1,-1], target, parentProps?.position||target)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    const children = Children.map(props.children, (child:any, key) => {
        if(!child) return []
        const position  = props.calcPos(child.props, props, key)
        const direction = mergeVec3([1,-1], position, props.position)
        return React.cloneElement(child, {
            parentProps: props, position, direction,
            calc    : child.props.calc   || props.calc,
            calcPos : child.props.calcPos|| props.calcPos,
            scale: child.props.scale || props.scale,
            color: child.props.color || props.color,
            depth: (props.depth||0) + 1
        })
    })
    return [
        {...props, children},
        {...props, position, rotation, scale},
    ]
}
