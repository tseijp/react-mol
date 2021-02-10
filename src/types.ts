import {ReactNode, MutableRefObject} from 'react'
import * as THREE from 'three'

export type AtomObject = Spread<THREE.Group, {
    id: number,
    group: THREE.Group,
    color: THREE.Color
}>

export type RenderProps<T extends object={}> = Spread<{
    ref: MutableRefObject<AtomObject>,
    geometry?: null | THREE.Geometry,
    material?: null | THREE.Material,
    count   ?: null | number,
    children?: ReactNode|((state:RenderProps<T>)=>ReactNode),
}, T>

export type AtomProps<T extends object={}> = Spread<{
    // FOR THREE
    matrix: THREE.Matrix4,
    position: Vec3,
    rotation: Vec3,
    scale: Vec3,
    color: string,
    ref?: MutableRefObject<AtomObject>,
    children?: ReactNode|((state:AtomProps<T>)=>ReactNode),
}, T>

export type MolProps = {
    distance: Vec3,
    element: number,
    matrix: THREE.Matrix4,
    index: number,
    angle: number,
    ring?: boolean,
    double?: boolean,
    recursion?: boolean
}

export type FlowProps = {
    args?: Fun<number[]>,
    position?: Fun,
    rotation?: Fun,
    scale?: Fun,
    color?: Fun<string>
}

export type BrickProps = {}

// ************************* UTILS ************************* //
export type Vec3<T=number> = [T,T,T]
export type Fun<T=Vec3,U=number> = T | ((...args:U[]) => T)
export type Merge<A, B> = {
    [P in keyof A]: P extends keyof B ? B[P] : A[P]
} & Omit<B, keyof A>

export type Spread<L extends object, R extends object> = Id<
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
