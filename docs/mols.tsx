import React from 'react'
import {C, H, O, Poly} from '../src'
export const H2O =()=> <H><O><H/></O></H>
export const CH4 =()=> <C><H/><H/><H/><H/></C>
export const CH3OH =()=>
    <H>
        <O>
        <C><H/><H/><H/></C>
        </O>
    </H>
export const CH3COOH =()=>
    <C>
        <C><H/><H/><H/></C>
        <O><H/></O>
        <O double/>
    </C>
export const Polyethylene =()=>
    <H>
        <Poly poly={2}>
        {(children,props) =>
            <C {...props}>
                <C rotation={[0,Math.PI,0]}>
                    {children||<H/>}
                    <H/><H/>
                </C>
                <H rotation={[0,Math.PI,0]}/>
                <H rotation={[0,Math.PI,0]}/>
            </C>
        }
        </Poly>
    </H>
export const Polypropylene =()=>
    <H>
        <Poly poly={2}>
        {(children, props) =>
            <C {...props} angle={Math.PI}>
                <C>
                    {children||<H/>}
                    <C><H/><H/><H/></C>
                    <H/>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
