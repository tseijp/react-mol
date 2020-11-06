import {ReactNode} from 'react'
export type Vec3<T=number> = [T,T,T]
export type MolProps = Partial<{
    // BASIC THREE
    position: Vec3,
    rotation: Vec3,
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
    ring: boolean,
    double: boolean,
}>
