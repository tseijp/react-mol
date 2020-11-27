import React from 'react'
import {C, H, O, CH3, Mol, Poly} from '../src'
// utils
const rand=(mul=Math.PI*2)=>Math.random()*mul

export const CH3OH =()=>
    <Mol recursion>
        <C><H/><H/><H/></C>
        <O><H/></O>
    </Mol>
export const CH3COOH =()=>
    <Mol recursion>
        <C><H/><H/><H/></C>
        <C><O double/></C>
        <O><H/></O>
    </Mol>
export const Polyethylene =()=>
    <H>
        <Poly n={2}>
        {(children, i) =>
            <C angle={(i%2)*Math.PI/2}>
                <C angle={(i%2)*Math.PI/2}>
                    {children||<H/>}
                    <H/><H/>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
export const Polypropylene =()=>
    <H>
        <Poly n={2}>
        {(children, i) =>
            <C angle={(i%2)*Math.PI/2}>
                <C angle={(i%2)*Math.PI/2}>
                    {children||<H/>}
                    <CH3/>
                    <H/>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
export const Random =()=>
    <H max={2000}>
        <Poly n={200}>
        {children =>
            <C angle={rand()}>
                <C angle={rand()}>
                    {children||<H/>}
                    <H/>
                    <C><H/><H/><H/></C>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
