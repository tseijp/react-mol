import React, {useContext, useRef, useState} from 'react'
import {Color, Group} from 'three'
import {render} from '../Render'
import {States} from '../types'
let uuid = 0

export function useHierarchy (props: any, ref: any): any
export function useHierarchy (props: any, ref: any) {
    const {states} = useContext<States>(render)
    const [index] = useState(() => uuid++)
    const color = useRef<Color>(new Color().set(props.color||"black"))
    const group = useRef<Group>(null)

    // change color
    React.useEffect(() => {
        if (!props.color) return
        color.current?.set(props.color||"black")
    }, [props.color])

    // change matrix
    React.useEffect(() => {
        if (!group.current) return
        group.current.updateMatrixWorld()
        states.current[index] = {
            ...group.current,
            group: group.current,
            color: color.current
        }
        // return () => void (delete states.current[index])
    }, [states, index])

    React.useImperativeHandle(ref, () => group.current && ({
        ...group.current,
        group: group.current,
        color: color.current
    }))

    // const children = useMemo(() =>
    //     props?.children && typeof props.children[0]==="function"
    //         ? props.children[0]({...props, state: props, children:null})
    //         : React.Children.map(props.children, (child: any, key) =>
    //             child && React.cloneElement(child, {
    //                 //⚠ crash if children isnt assigned null ⚠
    //                 ...props, state: props, children:null,
    //                 ...child.props, index: key
    //         })
    //     )
    // , [props])

    return {...props, ref: group}
}
