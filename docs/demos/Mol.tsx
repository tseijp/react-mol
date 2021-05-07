import React from 'react'
import {useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {C, H, O, CH3, Poly} from '../../src'
import {Instanced, Recursion} from '../../src'
import {molGeometry} from '../utils'
import * as THREE from 'three'
// utils
const rand=(mul=Math.PI*2)=>Math.random()*mul

export const MethylAlcohol =()=>
    <Instanced geometry={molGeometry()}>
        <OrbitControls {...({} as any)}/>
        <meshPhongMaterial attach="material"/>
        <C><H/><H/><H/><O><H/></O></C>
    </Instanced>

export const AcetilAcid =()=>
    <Instanced geometry={molGeometry()}>
        <OrbitControls {...({} as any)}/>
        <meshPhongMaterial attach="material"/>
        <Recursion>
            <C><H/><H/><H/></C>
            <C><O double/></C>
            <O><H/></O>
        </Recursion>
    </Instanced>

export const Polyethylene =()=>
    <Instanced geometry={molGeometry()}>
        <OrbitControls {...({} as any)}/>
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
    </Instanced>

export const Polypropylene =()=>
    <Instanced geometry={molGeometry()}>
        <OrbitControls {...({} as any)}/>
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
    </Instanced>

export const Random =()=> {
    const top = React.useRef<any>(null)
    const end = React.useRef<any>(null)
    const mesh = React.useRef<any>(null)
    const vec3 = React.useMemo(() => new THREE.Vector3(), [])

    useFrame(() => {
        if (!top.current || !end.current) return
        vec3.add(top.current.position)
        vec3.add(end.current.position)
        vec3.divideScalar(2)
        mesh.current?.position.set(...vec3.toArray())
    })

    return (
        <Instanced ref={mesh} geometry={molGeometry()}>
            <OrbitControls {...({} as any)}/>
            <meshPhongMaterial attach="material"/>
            <H ref={top}>
                <Poly n={200}>
                {children =>
                    <C angle={rand()}>
                        <C angle={rand()}>
                            {children||<H ref={end}/>}
                            <H/>
                            <C><H/><H/><H/></C>
                        </C>
                        <H/><H/>
                    </C>
                }
                </Poly>
            </H>
        </Instanced>
    )
}
export default Random
