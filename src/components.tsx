import React, {Children, useMemo} from 'react'
import {AtomProps, RenderProps} from './types'
import {useAtom, useRender} from './hooks'
import {Provider} from 'jotai'

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
    return useMemo(() => {
        const [topChild, ...otherChild] = Children.map(children, c=>c)
        if (typeof topChild!=="object") return null
        const grand = Children.map(topChild.props.children, c=>c)
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
        children: null | {(child: JSX.Element, key: number): JSX.Element},
    }>>
): null|JSX.Element

export function Poly ({children, n=0}: any) {
    return useMemo(() => {
        if (n<0) return null
        const child = children(n>0 && <Poly n={n-1} children={children}/>, n)
        return React.cloneElement(child, {children:null, ...child.props})
    }, [children, n])
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
