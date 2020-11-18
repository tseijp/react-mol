import React from 'react'
import {Props} from '../types'

export function calcFlow (props: Props): Props {
    const clone = React.Children.map(props.children, (child:any) => {
        if (!child) return null
        const position= [Math.random()*100-50,Math.random()*100-50,Math.random()*100-50]
        return React.cloneElement(child, {position})
    })
    return {...props, children: clone, }
}
