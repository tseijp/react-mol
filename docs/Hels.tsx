import React from 'react'
import {Poly, Hel} from '../src'

export const Archimedes =()=> (
    <Hel>
        <Poly n={100}>
            {next =>
                <Hel position={[1,1,1]}>
                    {next}
                </Hel>
            }
        </Poly>
    </Hel>
)
export const Fermat =()=> (
    <Hel>
    </Hel>
)
export const Power =()=> (
    <Hel>
    </Hel>
)
