import {ReactNode, MutableRefObject} from 'react'
import {Matrix4, Geometry, Material} from 'three'

export type Vec3<T=number> = [T,T,T]
export type Fun<T=Vec3,U=number> = T | ((...args:U[]) => T)
export type Props<T extends object={}> = Spread<{
    // BASIC THREE
    position: Vec3,
    rotation: Vec3,
    matrix: Matrix4,
    scale: Vec3,
    color: string,
    // BASIC ATOM
    ref: MutableRefObject<any>,
    // calc: (target:Props<T>)=>Props<T>,
    state: Props<MolProps>,
    top: boolean,
    index: number,
    cut?: number,
    max?: number,
    children?: ReactNode|((state:Props<T>)=>ReactNode),
    geometry?: null|Geometry|{():Geometry},
    material?: null|Material|{():Geometry},
}, T>
export type MolProps = {
    distance: Vec3,
    element: number,
    matrix: Matrix4,
    index: number,
    angle: number,
    ring?: boolean,
    double?: boolean,
    recursion?: boolean
}
export type HelProps = {
}
export type FlowProps = {
    args?: Fun<number[]>,
    position?: Fun,
    rotation?: Fun,
    scale?: Fun,
    color?: Fun<string>
}
export type SwarmProps = {
    args?: Fun<number[]>,
    force?: Fun,
    vector?: Fun,
    position?: Fun,
    rotation?: Fun,
    scale?: Fun,
    color?: Fun<string>
}
// ************************* UTILS ************************* //
type Spread<L extends object, R extends object> = Id<
    & Partial<{ [P in keyof (L & R)]: SpreadProp<L, R, P> }>
    & Pick<L, Exclude<keyof L, keyof R>>
    & Pick<R, RequiredProps<R>>
>
type SpreadProp<
    L extends object,
    R extends object,
    K extends keyof (L & R)
> = K extends keyof R
    ? (undefined extends R[K] ? L[Extract<K, keyof L>] | R[K] : R[K])
    : L[Extract<K, keyof L>]
type RequiredProps<T extends object> = {
    [P in keyof T]-?: undefined extends T[P] ? never : P
}[keyof T]
type Id<T> = { [P in keyof T]: T[P] }
