import React from 'react'
import {C, H, O, M, CH3, Poly} from '../src'
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
        {children =>
            <C angle={Math.PI}>
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
        {(children, i) =>
            <C angle={Math.PI}>
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
              <C ring>
              <H/></C>
            <H/></C>
          <H/></C>
        <H/></C>
      <H/></C>
    <H/></C>
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
export const Random =({rand=(mul=Math.PI*2)=>Math.random()*mul})=>
    <H>
        <Poly poly={100}>
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
