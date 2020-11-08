import React from 'react'
import {MolProps} from './types'

export function Poly (props: Partial<MolProps> & Partial<{
    children: null|((child:JSX.Element, key:number) => JSX.Element),
    n: number
}>): null|JSX.Element

export function Poly ({children,n=0,...props}:any) {
    return n>-1? React.cloneElement(
        children(n>0 && <Poly n={n-1} children={children}/>, n),
        props
    ) : null
}
