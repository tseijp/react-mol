import React from 'react'
import {C, H, O, Poly} from '../src'

export const CO2 =()=>
    <C position={[0,0,0]}>
        <O/>
        <O/>
    </C>
export const CH3OH =()=>
    <C position={[0,0,0]}>
        <H/>
        <H/>
        <H/>
        <O>
            <H/>
        </O>
    </C>
export const CH4 =()=>
    <C position={[0,0,0]}>
        <H/>
        <H/>
        <H/>
        <H/>
    </C>
export const H2O =()=>
    <O position={[0,0,0]}>
        <H/>
        <H/>
    </O>
export const Polyethylene =()=>
    <H>
        <Poly poly={10}>
        {(children, props) =>
            <C {...props}>
                <C>
                    {children||<H/>}
                    <H/><H/>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
