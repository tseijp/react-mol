import React from 'react'
import {
    C, H, O, M,
    CH3, OH, //CH2, CH, // ERROR : for Recursion
    Poly} from '../src'
export {O, OH}
export const H2O =()=> <H><O><H/></O></H>
export const CH4 =()=> <C><H/><H/><H/><H/></C>
export const CH3OH =()=>
    <H>
        <O angle={Math.PI}>
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
            <C {...props} angle={Math.PI}>
                <C>
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
        <Poly poly={2}>
        {(children, props, i) =>
            <C {...props} angle={Math.PI}>
                <C>
                    {children||<H/>}
                    <CH3 angle={i%2*Math.PI}/>
                    <H/>
                </C>
                <H/><H/>
            </C>
        }
        </Poly>
    </H>
export const Benzene = ()=>
    <C ring>
      <C ring>
        <C ring>
          <C ring>
            <C ring>
              <C ring/>
              <H/><H/>
            </C>
            <H/><H/>
          </C>
          <H/><H/>
        </C>
        <H/><H/>
      </C>
      <H/><H/>
    </C>

export const MCH3OH =()=>
    <M>
        <C><H/><H/><H/></C>
        <O><H/></O>
    </M>
export const MCH3COOH =()=>
    <M>
        <C><H/><H/><H/></C>
        <C><O double/></C>
        <O><H/></O>
    </M>
export const MPolyethylene =()=>
    <M>
        <H/>
        {Array(6).fill(0).map((_, i) =>
            <C key={i} angle={(i%2)?Math.PI:0}>
                <H/><H/>
            </C>
        )}
        <H/>
    </M>
export const MPolypropylene =()=>
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
export const MCH3COCH3 =()=>
    <M>
        <C><H/><H/><H/></C>
        <C><O double/></C>
        <C><H/><H/><H/></C>
    </M>
export const Random =({rand=(mul=Math.PI*2)=>Math.random()*mul})=>
    <H>
        <Poly poly={100}>
        {(children,props) =>
            <C {...props} angle={rand()}>
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
