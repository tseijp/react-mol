import React, {Children} from 'react'
import {Provider} from 'jotai'
import * as THREE from 'three'
import {Render} from './Render'
import {useMol} from './useMol'
import {Vec3, MolProps} from './types'
import {eulerVec3, scaleVec3, mergeVec3, calcRelative} from './utils'

const sqrt2_3 = Math.sqrt(2/3)
const sqrt1_3 = Math.sqrt(1/3)
const defaultGeometry = [new THREE.SphereBufferGeometry(1, 32, 32), new THREE.CylinderBufferGeometry(.05,.05,1,10)]
const defaultMaterial = [new THREE.MeshPhongMaterial(), new THREE.MeshPhongMaterial()]

export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
export const Recursion = (props:any) => {
    const [child, ...children] = React.Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    return React.cloneElement(child, {
        ...props, depth: 1, children: [
            ...(React.Children.toArray(child.props.children)||[]),
            <Recursion {...{children}}/>
        ]
    })
}
export function Mol <S extends object> (
    props: unknown & Partial<MolProps>
): null | JSX.Element

export function Mol ({
    geometry=defaultGeometry,
    material=defaultMaterial,
    length=2,
    depth=0,
    ...props
}: any) {
    const Atom = props.element? Hierarchy : Recursion
    if (typeof depth==="number" && depth > 0) return <Atom {...props}/>
    return (
        <Provider>
            <Render {...{geometry, material, length}}>
                <Atom {...props}
                    position= {props.position|| [0,0,0]}
                    calcMol = {props.calcMol || calcMol}
                    calcPos = {props.calcPos || calcPos}/>
            </Render>
        </Provider>
    )
}

export function calcPos (target:MolProps, parent:MolProps, key=0): Vec3 {
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
export const calcMol = (props:MolProps): MolProps[] => {
    const {position: target=[0,0,0], parentProps} = props
    const position = mergeVec3([.5,.5], target, parentProps?.position||target)
    const distance = mergeVec3([ 1,-1], target, parentProps?.position||target)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    const children = Children.map(props.children, (child:any, key) => {
        const position  = props.calcPos(child.props, props, key)
        const direction = mergeVec3([1,-1], position, props.position)
        return child && React.cloneElement(child, {
            parentProps: props, position, direction,
            calcMol : child.props.calcMol|| props.calcMol,
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
