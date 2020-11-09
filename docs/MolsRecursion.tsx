import React from 'react'
import {Mol as M, C, H, O, CH3,} from '../src'
export const H2O =()=> <M><H/><O/><H/></M>
export const CH4 =()=> <M><H/><C><H/><H/><H/></C></M>
export const CH3OH =()=>
    <M>
        <C><H/><H/><H/></C>
        <O><H/></O>
    </M>
export const CH3COOH =()=>
    <M>
        <C><H/><H/><H/></C>
        <C><O double/></C>
        <O><H/></O>
    </M>
export const Polyethylene =()=>
    <M>
        <H/>
        {Array(6).fill(0).map((_, i) =>
            <C key={i} angle={(i%2)?Math.PI:0}>
                <H/><H/>
            </C>
        )}
        <H/>
    </M>
export const Polypropylene =()=>
    <M>
        <H/>
        {Array(6).fill(0).map((_, i) =>
            <C key={i} angle={(i%2)?Math.PI:0}>
                {(i%2)
                    ? <CH3 angle={(i%4)?Math.PI:0}/>
                    : <H/>
                }
                <H/>
            </C>
        )}
        <H/>
    </M>

export const Random =({rand=(mul=Math.PI*2)=>Math.random()*mul})=>
    <M>
        <H/>
        {Array(200).fill(0).map((_, i) =>
            <C key={i} angle={rand()}>
                {(i%2)
                    ? <CH3 angle={rand()}/>
                    : <H/>
                }
                <H/>
            </C>
        )}
        <H/>
    </M>
