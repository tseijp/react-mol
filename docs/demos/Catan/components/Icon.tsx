import {Html} from '@react-three/drei'
import styled from 'styled-components'

const {abs} = Math

export const Icon = styled<any>(Html).attrs(_ => ({
    center: true,
    transform: true,
    style: { pointerEvents: 'none'},
    color: (_.token-7)**2-1? 'black': '#ff5588',
    dotLen: 7 - abs(_.token - 7) - 1,
    filter: `drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.1))`,
}))`
    pointer-events: none;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    > svg {
        fill: white;
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        filter: ${_ => _.filter};
        margin: ${_ => _.padding}px;
    }
    > span {
        filter: ${_ => _.filter};
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background: white;
        color: ${_ => _.color};
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        padding: ${_ => _.padding}px 0px;
        font-size: ${_ => _.fontSize}px;
        border-radius: ${_ => _.padding}px;
        margin-bottom: ${_ => _.padding}px;
        > span {
            width: ${_ => _.dotLen*(_.fontSize/4 - 5)}px;
            border-bottom: dotted ${_ => _.fontSize/8}px ${_ => _.color};
            transform: translateY(${_ => -_.padding/2 -_.fontSize/16}px);
        }
    }
`
