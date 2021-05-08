import * as THREE from 'three'

const rad = Math.sqrt(2)*2/3
const base = new THREE.Vector3(0,1,0)
const axis = new THREE.Vector3()
const vec3 = new THREE.Vector3()
const euler= new THREE.Euler()
const quat1= new THREE.Quaternion()

export function mergeVec3(rate: number[], ...vec: Vec3[]): Vec3 {
    return [0,1,2].map(j => rate.map((r,i) => r*vec[i][j]).reduce((a,b) => a+b)) as Vec3
}

export function scaleVec3(vec: Vec3=[0,0,0]): Vec3 {
    return [1, vec3.set(...vec).length(), 1] as Vec3
}

export function eulerVec3(_axis: Vec3=[1,0,0], _base: Vec3=[0,1,0]): Vec3 {
    axis.set(..._axis).normalize()
    base.set(..._base).normalize()
    quat1.setFromUnitVectors(base, axis);
    euler.setFromQuaternion(quat1)
    return euler.toArray().slice(0,3) as Vec3
}

export function calcMolPos (index: number=0, angle=Math.PI/2, double=false): Vec3 {
    // if (typeof index !== "number") return [0,0,0]
    const phi = index * Math.PI* 2/3 + (angle ?? 0)
    const vec = [rad*Math.cos(phi), 1/3, rad*Math.sin(phi)]
    return double
        ? mergeVec3([1,1],
            calcMolPos(0, angle),
            index<4? vec as Vec3: [0,-1,0])
        :   index<4? vec as Vec3: [0,-1,0]
}

export function nextFloor (...floor: number[]) {
    const max = Math.max(...floor)
    return floor
        .flatMap((v, i) => v === max? i: [])
        .reduce<any[]>((acc, i) => [...acc, ...acc.map(a => [i, ...a]), [i]], [])
        .map(acc => floor.map((v, i) => acc.indexOf(i) < 0? v: v + 1))
}

export function functionalProps <Props extends object={}>(props: Props, ...args: any[]) {
    const state: any = Object.assign({}, props)
    Object.keys(state).forEach(key => {
        if (typeof state[key] === "function")
            state[key] = state[key](...args)
    })
    return state
}

export type Vec3<T=number> = [T,T,T]

export type Fun<T=Vec3,U=number> = T | ((...args:U[]) => T)

// export type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
// export type Overwrite<T, O> = Omit<T, NonFunctionKeys<O>> & O
//
// export type NamedArrayTuple<T extends (...args: any) => any> = Parameters<T>
// type Args<T> = T extends new (...args: any) => any ? ConstructorParameters<T> : T
//
// export type Euler = THREE.Euler | Parameters<THREE.Euler['set']>
// export type Matrix4 = THREE.Matrix4 | Parameters<THREE.Matrix4['set']>
// export type Vector2 = THREE.Vector2 | Parameters<THREE.Vector2['set']>
// export type Vector3 = THREE.Vector3 | Parameters<THREE.Vector3['set']>
// export type Color = THREE.Color | number | string
// export type Layers = THREE.Layers | Parameters<THREE.Layers['set']>
// export type Quaternion = THREE.Quaternion | Parameters<THREE.Quaternion['set']>
//
// export type EventHandlers = {
//   onClick?: (event: MouseEvent) => void
//   onContextMenu?: (event: MouseEvent) => void
//   onDoubleClick?: (event: MouseEvent) => void
//   onPointerUp?: (event: PointerEvent) => void
//   onPointerDown?: (event: PointerEvent) => void
//   onPointerOver?: (event: PointerEvent) => void
//   onPointerOut?: (event: PointerEvent) => void
//   onPointerMove?: (event: PointerEvent) => void
//   onPointerMissed?: (event: React.MouseEvent) => void
//   onWheel?: (event: WheelEvent) => void
// }
//
// export interface NodeProps<T, P> {
//     attach?: string
//     attachArray?: string
//     attachObject?: NamedArrayTuple<(target: string, name: string) => void>
//     args?: Args<P>
//     children?: React.ReactNode
//     ref?: React.Ref<React.ReactNode>
//     key?: React.Key
//     onUpdate?: (self: T) => void
// }
//
// export type Node<T, P> = Overwrite<Partial<T>, NodeProps<T, P>>
// export type Object3DNode<T, P> = Overwrite<Node<T, P>, {
//     position?: Vector3
//     up?: Vector3
//     scale?: Vector3
//     rotation?: Euler
//     matrix?: Matrix4
//     quaternion?: Quaternion
//     layers?: Layers
//     dispose?: (() => void) | null
// }> & EventHandlers
//
// export type GroupProps = Object3DNode<THREE.Group, typeof THREE.Group>
// export type InstancedMeshProps = Object3DNode<THREE.InstancedMesh, typeof THREE.InstancedMesh>

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
