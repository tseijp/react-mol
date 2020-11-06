import React from 'react'
import {MolProps} from './types'
export function Poly (props: Partial<MolProps> & Partial<{
    children: null|((child:JSX.Element, props:MolProps, key:number) => JSX.Element),
    poly: number
}>): null|JSX.Element
export function Poly ({children,poly=0,...props}:any) {
    return poly>-1 && children(poly>0 && <Poly poly={poly-1} children={children}/>, props, poly)
}
