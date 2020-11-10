import {ReactNode} from 'react'
import {Matrix4} from 'three'

export type Vec3<T=number> = [T,T,T]
export type Array<T> = T | T[]
export type Props = {
    // BASIC THREE
    scale: Vec3,
    position: Vec3,
    rotation: Vec3,
    direction: Vec3,
    matrix: Matrix4,
    color: string,
    // BASIC MOL
    calc   : (target:Props)=>Props[],
    calcPos: (target:Props,parent:Props,key:number)=>Vec3,
    depth: number,
    length: number,
    // FOR M
    parentProps: Props,
    children: ReactNode,
    element: number,
    index: number,
    angle: number,
    ring?: boolean,
    double?: boolean,
    recurse?: boolean,
}
