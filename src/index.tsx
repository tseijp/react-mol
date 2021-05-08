import React, {Children, Ref, forwardRef, cloneElement, createElement as el} from 'react'
import {useFrame} from '@react-three/fiber'
import {useAtom, AtomProps, useInstanced, InstancedProps} from './hooks'
import {eulerVec3, calcMolPos, functionalProps, nextFloor, Fun, Vec3} from './utils'

const {sin} = Math

export * from './utils'
export * from './hooks'
export const Atom = forwardRef(_Atom)
export const Instanced = forwardRef(_Instanced)
export const Recursion = forwardRef(_Recursion)
export const Honey = forwardRef(_Honey)
export const Poly = forwardRef(_Poly)
export const Tile = forwardRef(_Tile)
export const Mol = forwardRef(_Mol)
export const Flow = forwardRef(_Flow)
export const H = forwardRef((p: any, ref) => <Mol {...p} ref={ref} color="white"/>)
export const C = forwardRef((p: any, ref) => <Mol {...p} ref={ref} color="black"/>)
export const O = forwardRef((p: any, ref) => <Mol {...p} ref={ref} color="red"/>)
export const N = forwardRef((p: any, ref) => <Mol {...p} ref={ref} color="blue"/>)
export const OH = forwardRef((p: any, ref) => <O {...p} ref={ref}><H/></O>)
export const CO = forwardRef((p: any, ref) => <C {...p} ref={ref}><O double/></C>)
export const CH = forwardRef((p: any, ref) => <C {...p} ref={ref}><H/></C>)
export const CH2 = forwardRef((p: any, ref) => <C {...p} ref={ref}><H/><H/></C>)
export const CH3 = forwardRef((p: any, ref) => <C {...p} ref={ref}><H/><H/><H/></C>)
export const Sin = forwardRef((p: any, ref) => <Flow {...p} ref={ref} args={(x,_,z,t) => [sin((x+t)/3)+sin((z+t)/2)]} />)
export const Box = forwardRef((p: any, ref) => <Flow {...p} ref={ref} args={(x,y,z,t) => [sin(x/4+t) +sin(y/4+t)+sin(z/4+t)]} />)

function _Atom <T extends object={}>(
  props: Partial<AtomProps<T>>,
  ref: Ref<any>
): null | JSX.Element

function _Atom (props: any, ref: any) {
  return <group {...useAtom(props, ref)}/>
}

function _Instanced <T extends object={}>(
  props: Partial<InstancedProps<T>>,
  ref: Ref<any>
): null | JSX.Element;

function _Instanced (props: any, ref: any) {
  return <instancedMesh {...useInstanced(props, ref)}/>
}

function _Recursion <T extends object={}> (
  props: Partial<InstancedProps<T>>,
  ref: Ref<any>
): null | JSX.Element;

function _Recursion (props: any, ref: any) {
  const [child, ...other] = Children.map(props.children, c=>c)
  if (typeof child!=="object") return null
  const grand = Children.map(child.props.children, c => c)
  const children = [...(grand ?? []), other.length && el(_Recursion, {}, other)]
  return cloneElement(child, {ref, recursion: false, children})
}

function _Honey <T extends object={}> (props: Partial<AtomProps<T & {
  children: (floor: number[], key: number) => JSX.Element
  floor?: number[]
}>>, ref: Ref<any>): JSX.Element

function _Honey ({as='group', floor: [i,j,k]=[0,0,0], children, ...other}: any, ref: any) {
  const nexts = React.useMemo(() => nextFloor(i,j,k), [i,j,k])
  return el(as, {ref, ...other}, nexts.map((...args: any) => children(...args)))
}

function _Poly <T extends object={}> (
  props: Partial<AtomProps<T & {
    n: number,
    children: (target: JSX.Element, index: number) => JSX.Element,
}>>, ref: Ref<any>): null|JSX.Element

function _Poly ({children, n=0}: any, ref: any) {
  if (n <= 0) return null
  const target = children(el(Poly, {n:n - 1}, children), n - 1)
  return cloneElement(target, {children:null, ref, ...target.props})
}

function _Tile <Item=number, Key=number>(props: {
  [key: string]: any| ((item: Item, key: Key) => any),
  items?: Item[],
  keys?: Key[],
  children: ((item: Item, index: number) => JSX.Element) | JSX.Element
}, ref: Ref<any>): null | JSX.Element

function _Tile ({items=[], keys=[], children, ...props}: any, ref: any) {
  return (
    <Poly n={items.length || keys.length} ref={ref}>
      {(element: any, i=0) =>
        <React.Fragment key={keys[i] ?? i}>
          {typeof children === "function"
            ? children(items[i] ?? i, keys[i] ?? i)
            : children}
          {el('group', functionalProps(props, items[i] ?? i, keys[i] ?? i), element)}
        </React.Fragment>
      }
    </Poly>
  )
}

function _Mol (props: {
  distance: Vec3,
  element: number,
  matrix: THREE.Matrix4,
  index: number,
  angle: number,
  ring?: boolean,
  double?: boolean,
  recursion?: boolean
}, ref: Ref<any>): null | JSX.Element

function _Mol (props: any, ref: any) {
  const {index: i, angle: a, double:d} = props
  const state = React.useMemo(() => {
    const position = calcMolPos(i, a, d)
    const rotation = eulerVec3(position, [0,1,0])
    return {position, rotation}
  }, [i, a, d])

  const children = React.useMemo(() =>
    Children.map(props.children, (child :any, index) =>
      cloneElement(child, {index})
  ), [props.children])

  return <Atom {...props} {...state} ref={ref} children={children}></Atom>
}

function _Flow (props: Partial<AtomProps<{
  args?: Fun<number[]>,
  position?: Fun,
  rotation?: Fun,
  scale?: Fun,
  color?: Fun<string>
}>>, ref: Ref<any>): null | JSX.Element

function _Flow (props: any, forwardRef: any) {
  const ref = React.useRef<any>(null)
  const now = React.useRef<number>(0)
  const fun = (value: any): value is Function => typeof value==="function"

  React.useImperativeHandle(forwardRef, () => ref.current)
  useFrame((_, delta) => {
    if (!ref.current) return
    now.current += delta
    const { position: p, scale: s, args: a,
            rotation: r, color: c } = props
    const args = fun(a)
      ? a(now.current, ...ref.current.position.toArray())
      : [ now.current, ...(a ?? []) ]
    p && ref.current.position.set(...(fun(p)? p(...args): p))
    r && ref.current.rotation.set(...(fun(r)? r(...args): r))
    s && ref.current.scale.set(...(fun(s)? s(...args): s))
    if (c && ref.current.color)
      ref.current.color.set(fun(c)? c(...args): c)
  })
  return <Atom ref={ref}></Atom>
}

// TODO functional Props for Poly
// export function Poly <T extends object={}>(
//     props: Partial<Props<T> & {
//         n: number,
//     children: null | ((
//         next: ((nextProps?:Partial<Props<T>>) => JSX.Element),
//         key : number
//     ) => JSX.Element),
//     }>
// ): null|JSX.Element
// export function Poly ({children,n=0,...props}: any) {
//     if (n<0) return null
//     const child = children(n>0 && ((nextProps: any={}) => {
//         return <Poly n={n-1} {...nextProps} children={children}/>
//     }), n)
//     return cloneElement(child, {...props, children: null,...child.props})
// }
