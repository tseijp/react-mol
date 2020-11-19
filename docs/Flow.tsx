import React from 'react'
import {Render, Flow} from '../src'
export const Stage =()=> (
    <Render>
        {Array(10).fill(0).map((_,z) =>
            <>{Array(10).fill(0).map((_,x) =>
                <Flow key={""+z+"-"+x} depth={1} position={[x,0,z]} scale={[1,1,1]} />
            )}</>
        )}
    </Render>
)
