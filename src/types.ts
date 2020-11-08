import {ReactNode} from 'react'
import {Matrix4} from 'three'

export type Vec3<T=number> = [T,T,T]
export type Array<T> = T | T[]
export type MolProps = {
    // BASIC THREE
    scale: Vec3,
    position: Vec3,
    rotation: Vec3,
    direction: Vec3,
    matrix: Matrix4,
    color: string,
    // FOR MOL
    calcMol: (target:MolProps)=>MolProps[],
    calcPos: (target:MolProps,parent:MolProps,key:number)=>Vec3,
    parentProps: MolProps,
    children: ReactNode,
    element: number,
    index: number,
    angle: number,
    depth: number,
    ring?: boolean,
    double?: boolean,
}
