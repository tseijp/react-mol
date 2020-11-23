import React from 'react'
// import {useFrame} from 'react-three-fiber'
import {Atom, Poly} from '../src'
export function Basic () {
    const ref = React.useRef<any>(null)
    // useFrame(() => {
    //     ref.current.rotation.x  =
    //     ref.current.rotation.y  =
    //     ref.current.rotation.z += 0.025
    // })
    return (
        <Atom color="red"
            position={[1, -2, -10]}
            rotation={[0,  0,  Math.PI/3]}>
            <boxBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" />
            <Poly n={10}>
                {next =>
                <Atom  color="green"
                    position={[2, 0, 1]}
                    rotation={[0, 0, Math.PI/3]}>
                    {next ||
                    <Atom ref={ref}
                        color="blue"
                        position={[2,0,0]}/>
                    }
                </Atom>
                }
                </Poly>
      </Atom>
    )
    // TODO Recursion
    // return (
    //     <Atom recursion>
    //         <boxBufferGeometry attach="geometry" />
    //         <meshPhongMaterial attach="material" />
    //         <Atom  color="red"
    //             position={[1, -2, -10]}
    //             rotation={[0,  0,  Math.PI/3]}/>
    //         {Array(10).fill(0).map((_, i) =>
    //             <Atom key={i} color="green"
    //                 position={[2, 0, 1]}
    //                 rotation={[0, 0, Math.PI/3]}/>
    //         )}
    //         <Atom ref={ref} color="blue" position={[2,0,0]}/>
    //   </Atom>
    // )
}
