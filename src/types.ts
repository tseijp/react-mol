import {ReactNode} from 'react'
export type Vec3<T=number> = [T,T,T]
export type MolProps = {
    ref:{current:any},
    depth   : number,
    position: Vec3,
    rotation: Vec3,
    scale   : Vec3,
    children: ReactNode,
    parentProps: MolProps,
    color:string,
}
