import {ReactNode} from 'react'
import {Matrix4} from 'three'

export type Vec3<T=number> = [T,T,T]
export type Array<T> = T | T[]
export type Props<T extends object={}> = Spread<{
    // BASIC THREE
    position: Vec3,
    rotation: Vec3,
    scale: Vec3,
    color: string,
    // BASIC ATOM
    calc: (target:Props<T>)=>Props<T>[],
    depth: number,
    length: number,
    children: ReactNode,
}, T>
export type MolProps = {
    calcPos: (
        target:Props<MolProps>,
        parent:Props<MolProps>,
        key:number
    ) => Vec3,
    parentProps: Props,
    direction: Vec3,
    element: number,
    matrix: Matrix4,
    index: number,
    angle: number,
    ring?: boolean,
    double?: boolean,
    recursion?: boolean
}
export type HelProps = {
    parentProps?: Props<HelProps>,
}

// ************************* UTILS ************************* //
type Spread<L extends object, R extends object> = Id<
  Partial<{ [P in keyof (L & R)]: SpreadProp<L, R, P> }> &
    Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, RequiredProps<R>>
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
