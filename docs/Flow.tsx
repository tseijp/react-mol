import React from 'react'
import { Flow} from '../src'
export const Stage =()=> (
    <Flow>
        {Array(10).fill(0).map((_,z) =>
            <group key={z}>
            {Array(10).fill(0).map((_,x) =>
                <Flow key={x} depth={1} position={[x,0,z]} scale={[1,1,1]} />
            )}
            </group>
        )}
    </Flow>
)
