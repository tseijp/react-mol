import React from 'react'
import {C, H, O, CH3, Poly} from '../../src'
import {Render, Recursion, mergedGeometry as molGeometry} from '../../src'
// utils
const rand=(mul=Math.PI*2)=>Math.random()*mul

export const MethylAlcohol =()=>
    <Render geometry={molGeometry}>
        <meshPhongMaterial attach="material"/>
        <C><H/><H/><H/><O><H/></O></C>
    </Render>
export const AcetilAcid =()=>
    <Render geometry={molGeometry}>
        <meshPhongMaterial attach="material"/>
        <Recursion>
            <C><H/><H/><H/></C>
            <C><O double/></C>
            <O><H/></O>
        </Recursion>
    </Render>
export const Polyethylene =()=>
    <Render geometry={molGeometry}>
        <meshPhongMaterial attach="material"/>
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
    </Render>
export const Polypropylene =()=>
<Render geometry={molGeometry}>
    <meshPhongMaterial attach="material"/>
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
</Render>
export const Random =()=>
    <Render geometry={molGeometry}>
        <meshPhongMaterial attach="material"/>
        <H>
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
    </Render>
export default Random
