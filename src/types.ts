import {ReactNode} from 'react'
import {Matrix4} from 'three'
export type Vec3<T=number> = [T,T,T]
export type MolProps = {
    // BASIC THREE
    scale: Vec3,
    position: Vec3,
    rotation: Vec3,
    direction: Vec3,
    matrix: Matrix4,
    color: string,
    // FOR MOL
    parentProps: MolProps,
    children: ReactNode,
    element: number,
    angle: number,
    depth: number,
    ring?: boolean,
    double?: boolean,
}
