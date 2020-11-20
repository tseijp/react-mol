import {Props, HelProps} from '../types'
export function calcHel ({children, ...props}:Props<HelProps>): Props<HelProps> {
    return {...props, position:[0,0,0]}
}
