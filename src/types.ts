import {ReactNode} from 'react'
export type Vec3<T=number> = [T,T,T]
export type MolProps = Partial<{
    // BASIC THREE
    position: Vec3,
    rotation: Vec3,
    scale: Vec3,
    color: string,
    depth: number,
    // FOR MOL
    ref: {current:any},
    children: ReactNode,
    parentProps: MolProps,
    element: number,
}>
