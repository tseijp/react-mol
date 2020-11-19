import {Props, HelProps} from '../types'
import {mergeVec3} from '../utils'
export function calcHel ({children, ...props}:Props<HelProps>): Props<HelProps> {
    const position = mergeVec3([.1,.1], props.position||[0,0,0], [10,10,10])
    const rotation = mergeVec3([.1,.1], props.rotation||[0,0,0], [10,10,10])
    return {...props, position, rotation}
}
