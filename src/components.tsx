import React from 'react'
import {AtomProps, RenderProps} from './types'
import {useAtom, useRender} from './hooks'
import {Provider} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {eulerVec3, calcMolPos, functionalProps} from './utils'
import {MolProps, FlowProps} from './types'

export type Atom = {
    <T extends object={}>(props: unknown & Partial<AtomProps<T>>): null | JSX.Element
}

export const Atom = React.forwardRef((props: any, ref) => (
    <group {...useAtom(props, ref)}/>
))

export type Instanced = {
    <T extends object={}>(props: RenderProps<T>): JSX.Element;
}

export const Instanced = React.forwardRef((props: any, ref) => {
    return <instancedMesh {...useRender(props, ref)} />
})

export const Render = React.forwardRef((props: any, ref: any) => {
    return (
        <React.Suspense fallback={null}>
            <Provider>
                <Instanced ref={ref} {...props}/>
            </Provider>
        </React.Suspense>
    )
})

export const Recursion = ({children}: any) => {
    return React.useMemo(() => {
        const [topChild, ...otherChild] = React.Children.map(children, c=>c)
        if (typeof topChild!=="object") return null
        const grand = React.Children.map(topChild.props.children, c=>c)
        return React.cloneElement(topChild, {
            recursion: false, children: [
                ...(grand || []),
                ...(otherChild.length? [<Recursion children={otherChild}/>]: [])
            ]
        })
    }, [children])
}
export function Poly <T extends object={}>(
    props: Partial<AtomProps<T & {
        n: number,
        children: (children: JSX.Element, index: number) => JSX.Element,
    }>>
): null|JSX.Element

export function Poly ({children, n=0}: any) {
    return React.useMemo(() => {
        if (n <= 0) return null
        const child = children(n > 0 && <Poly n={n-1} children={children}/>, n)
        return React.cloneElement(child, {children:null, ...child.props})
    }, [children, n])
}

export function Brick <Item=number, Key=number>(
  props: {
    [key: string]: any| ((item: Item, key: Key) => any),
    items: Item[],
    keys?: Key[],
    children: ((item: Item, index: number) => JSX.Element) | JSX.Element
}): null | JSX.Element

export function Brick ({items=[], keys=[], children, ...props}: any) {
  return (
    <Poly n={items.length}>
      {(child, i) =>
      <React.Fragment key={keys[i] || i}>
        {typeof children ==="function"
            ? children(items[i], keys[i] || i)
            : children}
        <group children={child} {...functionalProps(props, items[i], keys[i])}/>
      </React.Fragment>
      }
    </Poly>
  )
}

export type Mol = {(props: MolProps): null | JSX.Element}
export const Mol = React.forwardRef((props: any, ref) => {
  const {index: i, angle: a, double:d} = props
  const state = React.useMemo(() => {
    const position = calcMolPos(i, a, d)
    const rotation = eulerVec3(position, [0,1,0])
    return {position, rotation}
  }, [i, a, d])

  const children = React.useMemo(() =>
    React.Children.map(props.children, (child :any, index) =>
      React.cloneElement(child, {index})
  ), [props.children])

  return <Atom {...props} {...state} ref={ref} children={children}></Atom>
})

export function Flow (props: Partial<AtomProps<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
  const ref = React.useRef<any>(null)
  const now = React.useRef<number>(0)
  const fun = (value: any): value is Function => typeof value==="function"
  useFrame((_, delta) => {
    if (!ref.current) return
    now.current += delta
    const { position: p, scale: s, args: a,
            rotation: r, color: c } = props
    const args = fun(a)
        ? a(now.current, ...ref.current.position.toArray())
        : [ now.current, ...(a || []) ]
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
//     return React.cloneElement(child, {...props, children: null,...child.props})
// }
