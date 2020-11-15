import React from 'react'
import {Props} from './types'

export function Poly <T extends object={}>(
    props: Partial<Props<T>> & Partial<{
        children: null|((child:JSX.Element, key:number) => JSX.Element),
        n: number
    }>
): null|JSX.Element

export function Poly ({children,n=0,...props}: any) {
    if (n<0) return null
    return React.cloneElement(
        children(n>0 && <Poly n={n-1} children={children}/>, n),
        props
    )
}
