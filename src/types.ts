import {ReactNode} from 'react'
import {Matrix4} from 'three'
export type Vec3<T=number> = [T,T,T]
export type MolProps = {
    // BASIC THREE
    position: Vec3,
    rotation: Vec3,
    matrix: Matrix4,
    direction: Vec3,
    scale: Vec3,
    color: string,
    // FOR MOL
    ref: {current:any},
    children: ReactNode,
    parentProps: MolProps,
    element: number,
    angle: number,
    depth: number,
    // index: number[],
    ring?: boolean,
    double?: boolean,
}
